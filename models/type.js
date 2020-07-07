const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Enter a product type'],
        unique: 1
    }
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

module.exports = {ProductType};