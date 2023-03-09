const Product = require("../Models/Product");

const createProduct = async (req, res) => {
    const { name, price, code, stt, description } = req.body
    try {
        const product = req.body
        const data = await Product.create(product)
        await data.save();
        res.json({
            success: true,
            message: "Tạo sản phẩm thành công !",
            data,
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Tạo sản phẩm thất bại !" });
    }
}
module.exports = { createProduct };