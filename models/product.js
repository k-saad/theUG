const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100  
    },
    price: {
        required: true,
        type: Number,
        maxlength: 100
    },
    type: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    ETA: {
        required: true,
        type: Number,
        maxlength: 255
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true, 
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };