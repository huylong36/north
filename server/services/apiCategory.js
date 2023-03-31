const Category = require("../Models/Category");

const loadCategory = async (req, res) => {
    const categories = await Category.find()
    return res.json({
        success: true,
        message: "load successfully",
        categories
    });
}
const createCategory = async (req, res) => {
    const { name, status } = req.body
    try {
        const data = await Category.create(req.body)
        data.status = 0;
        res.json({
            success: true,
            message: "Tạo danh mục thành công !",
            data,
        });
    } catch (error) {
        console.log(error)
        throw new Error('')
    }
}
const updateCategory = async (req, res) => {
    const categoryUpdate = req.body
    const category = await Category.findOneAndUpdate({ _id: categoryUpdate._id }, { $set: { ...categoryUpdate } }, { new: true })
    return res.json({
        success: true,
        message: "update category success",
        category,
    });
}
const detailCategory = async (req, res) => {
    const categoryItem = req.body
    const categoryUpdate = await Category.findOne(categoryItem)
    return res.json({
        success: true,
        message: "update category success",
        categoryUpdate,
    });
}
const deleteCategory = async (req, res) => {
    const item = req.body
    const deleteItem = await Category.findOneAndDelete({ _id: item._id }, item, { new: true })
    return res.json({
        success: true,
        message: "delete category success",
        deleteItem,
    });

}



module.exports = { createCategory, loadCategory, detailCategory, updateCategory, deleteCategory };