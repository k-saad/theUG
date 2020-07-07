const { User } = require('../models/user');

let auth = (req,res,next) => {
    //our cookie is attatched to the req object 
    const cookie = req.cookies.w_auth;
    User.findByToken(cookie, (err, user) => {
        if(err) throw err; // wth does this throw do
        if(!user) res.json({isAuth:false, error:err});
        // if you find a user with that token, pass them along in the req object
        req.token = cookie;
        req.user = user;
        next();
    });
};

module.exports = { auth };