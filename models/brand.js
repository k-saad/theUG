const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Enter a Brand'],
        unique: 1
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };