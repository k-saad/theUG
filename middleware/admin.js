let admin = (req,res,next) => {
    if(req.user.role === 0){
        return res.json({success: false, message: 'admin status required'})
    }
    next();
};

module.exports = { admin };