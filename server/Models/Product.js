const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
    },
    stt: {
        type: Number,
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
    }
})
module.exports = mongoose.model('products', ProductSchema)