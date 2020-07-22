const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
/*
------------------Setup-------------------
*/
const app = express();
const PORT = 3003; // change this later

require('dotenv').config();

//redefining mongoose.Promise to global promise definition
mongoose.Promise = global.Promise; // still dunkno what this does..
//connecting to database
//process.env.databse gets replaced when the app gets deployed
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true } ,function(err){
  err ? console.log(err) : console.log('// // database connected // //',`\n`);
})

/*
-------------------------------------
------------------Middleware-------------------
-------------------------------------
*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use(cookieParser());

const { auth } = require('../middleware/auth'); //for checking cookies
const { admin } = require('../middleware/admin'); // for checking user role

/*
-------------------------------------
------------------Models-------------------
-------------------------------------
*/const { User } = require('../models/user');
const { ProductType } = require('../models/type');
const { Brand } = require('../models/brand');
const { Product } = require('../models/product');

//preliminary default endpoint; does practically nothing
app.get('/', function(req,res){
  console.log(req.body);
  res.send(`hi there`);
});

/*
-------------------------------------
------------------Endpoints-------------------
-------------------------------------
*/

//Authentication

//verify authentication endpoint
app.get('/api/users/auth',auth ,(req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
} )

// registration - saves database document after scrambling password
app.post('/api/users/register', (req,res) => {
  const user = new User(req.body);

  user.save((err,doc) => {
    if(err){
      return res.json({ success: false, err});
    };
    
    res.status(200).json({
      success: true,
      doc:doc
    })
  })

})

// login - checks for user, compares encrypted password, assigns token
app.post('/api/users/login',(req,res)=> {
  User.findOne({email:req.body.email}, function(err,user){
    //this method returns a null user when it isnt found
    if(!user){
      //end the request by telling the user that the email wasn't found
      res.json({Loginsuccess:false,message:'email not found', err});
    }else{
      user.comparePasswords(req.body.password, function(err, isMatch){
      //if we got an error and the match was false, end the request with a message and a notif
      if(err || isMatch == false){
        res.json({Loginsuccess: false, message:"err: incorrect password!"})
      }else{
        user.issueToken(function(err, doc){
          if(err) return res.status(400).send({success:false, err});

          res.cookie('w_auth', doc.token).status(200).json({success:true, doc})
        });
      }
      });
    }
  })
})

//logout 
app.get('/api/users/logout', auth, (req,res) => {
  User.findOneAndUpdate({ _id:req.user._id },{ token:'' }, (err, doc)=> {
    if(err){ res.json({success:false, err})}

    res.status(200).send(
      {
        success:true,
        doc:doc
    }
    )
  })
})

// Database Endpoints

//Brand Creation Endpoint
app.post('/api/product/brand',auth,admin,(req,res) => {
  const brand = new Brand(req.body);

  brand.save((err,doc) => {
    if(err) return res.json({success: false, err});
    
    res.status(200).json({success: true, doc});
  })
})

//Get Brands
/*
app.get('/api/product/brand', (req,res) => {
  Brand.find({}, (err,doc) => {
    if(err) return res.json({success: false, err});

    res.status(200).send(doc)
  })
})
*/

// ProductTypes Endpoints

//New Product Type
app.post('/api/product/product-type',auth,admin,(req,res) => {
  const producttype = new ProductType(req.body);

  producttype.save((err,doc) => {
    if(err) return res.json({succeess: false, err});

    res.status(200).json({success: true, doc});
  })
})

//Get Product Types
app.get('/api/product/product-type', (req,res) => {
  ProductType.find({}, (err,doc) => {
    if(err) return res.json({success: false, err});

    res.status(200).json(doc); 
  })
})

// Products Endpoints

// New Product
app.post('/api/product/article',auth,admin, (req,res) => {
 const product = new Product(req.body);

 product.save((err, doc) => {
   if(err) return res.json({success: false, err});

   res.status(200).json({success: true, doc})
 })
})

//Get sorted Products
// get sorted products /api/product/articles?sortBy=sold&order=desc&limit=100
app.get('/api/product/articles', (req,res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let order = req.query.oder ? req.query.oder : 'asc';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  //asc/desc doesnt appear to change anything
  Product.find().
  populate('type').
  sort([[sortBy,order]]).
  limit(limit).
  exec((err, doc)=>{
    if(err) res.json({success: false, err}); 

    res.status(200).json({success: true, doc})
  })
})

// get product by ID, /api/product/articles-by-id?id=JDLSJDKSJDKSJDL,5ed1584fce5ffc054c4569d6,5ed1586dce5ffc054c4569d7&type=single
app.get('/api/product/articles-by-id', (req,res) => {
  let type = req.query.type;
  let items = req.query.id;

  if(type === "array"){
    let idsArray = items.split(',');
    items= [];
    items = idsArray.map((id)=> { return mongoose.Types.ObjectId(id)});
  }
  /*
  Product.find({'_id': {$in: items}}, (err,doc)=> {
    if(err || doc == 0) res.json({success: false, err}); // works, but bad code

    res.status(200).json({success: true, doc})
  })
  */
  //same method as above, using exec. exec works the same as a callback
  Product.find({'_id': {$in: items}}).populate('type').exec((err,docs)=> {
    if(err) res.json({success: false, err});
    res.status(200).json({success: true, docs})
  })
})

app.listen(PORT, function(){
  console.log(`// // server started // // Port: ${PORT}`);
})
