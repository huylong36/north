const Product = require("../Models/Product");

const createProduct = async (req, res) => {
    const { name, price, code, stt, description } = req.body
    try {
        const product = req.body
        const data = await Product.create(product)
        // await data.save();
        res.json({
            success: true,
            message: "Tạo sản phẩm thành công !",
            data,
        });
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}
const getAllProduct = async (req, res) => {
    const { skip, limit } = req.query;
    try {
        const products = await Product.find().skip(skip ?? 0).limit(limit ?? 10)
        const totalPages = Math.ceil(await Product.countDocuments() / 10);
        res.json({ products, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}
module.exports = { createProduct, getAllProduct };