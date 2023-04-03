const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
    },
    code: {
        type: String,
    },
    stt: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    imagesPreview: {
        type: Array,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    }
})
module.exports = mongoose.model('products', ProductSchema)