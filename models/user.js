const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

SALT_I = 10;

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type:String,
        required:[true, 'enter a valid email bruh, what else you hoping to sign up with? shiiiieeee'],
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required:[true, 'the account needs a password bruh, why you givin me a hard time?'],
        trim: true, 
        minlength: 5,
    },
    name: {
        type: String,
        required: [true, 'cant move forward with this unless you provide us with a name'],
        trim: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    }
})

userSchema.pre('save', function(next){
    //we create an alias for the current user object; because this stops referring to the object later due to a function enclosure
    var user=this;

    if(user.isModified('password')){ //continue with password hashing only if the pass was altered
        console.log("password being modified")
        bcrypt.genSalt(SALT_I, function(err, salt) {//hashing requires a salt. to mix your password with salt..
            if(err){ // if you get an error, console log it and move on
                console.log('error generating salt:', err);
                return next(err); // how to deal with this error?
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    console.log('error generating hash:', err);
                    return next(err);
                }
                user.password = hash; // set password to hash
                console.log('saving new user to db: ', '\n' ,user);
                next();
            })
        }) 
    } else {
        next()
    } 
})

//this method compares users's database password with the one they provided
//it returns true if the passwords match, false otherwise.
userSchema.methods.comparePasswords = function(candidatePassword, cb) {
    //password hashing library is used to compare the two passwords
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        
        return cb(null,isMatch);
    })
}

userSchema.methods.issueToken = function(cb) {
    user = this;
    let token = jwt.sign(user._id.toHexString(),process.env.PASSWORD);

    user.token = token;

    user.save(function(err,doc){
        if(err) {
            return cb(err)
        }else{
            return cb(null,doc);
        }
    })
}

userSchema.statics.findByToken = function(token, cb) {
    user = this;

    jwt.verify(token, process.env.PASSWORD, (err,decode) => {
        if(err) return cb(err);
        
        user.findOne({"_id":decode, "token":token}, (err, user) => {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


let User = mongoose.model('User', userSchema);

module.exports = { User };