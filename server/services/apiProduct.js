const Product = require("../Models/Product");

const createProduct = async (req, res) => {
    const { name, price, code, image, stt, description } = req.body
    try {
        const product = req.body
        const data = await Product.create(product)
        res.json({
            success: true,
            message: "Create Product successfully !",
            data,
        });
    } catch (error) {
        console.log(error)
        throw new Error('')
    }
}
const getAllProduct = async (req, res) => {
    const { skip, limit } = req.query;
    try {
        const products = await Product.find().skip(skip ?? 0).limit(limit ?? 10)
        const totalPages = Math.ceil(await Product.countDocuments() / 10);
        res.json({ products, totalPages });
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}

const getDetailById = async (req, res) => {
    const productId = { _id: req.params.id }
    const detail = await Product.findById(productId)
    return res.json({
        success: true,
        message: "get detail successfully",
        detail
    });
}
const updateProduct = async (req, res) => {
    const productUpdate = req.body
    const update = await Product.findOneAndUpdate({ _id: productUpdate._id }, productUpdate, { new: true })
    return res.json({
        success: true,
        message: "update product success",
        update,
    });
}
const deleteProduct = async (req, res) => {
    const deleteProduct = req.body
    const deleteItem = await Product.findOneAndDelete({ _id: deleteProduct._id }, deleteProduct, { new: true })
    return res.json({
        success: true,
        message: "delete product success",
        deleteItem,
    });

}


module.exports = { createProduct, getAllProduct, updateProduct, getDetailById, deleteProduct };