const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        status: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }


)
module.exports = mongoose.model('categories', CategorySchema)