const express = require('express');
const { createCategory, loadCategory, updateCategory, detailCategory, deleteCategory } = require('../services/apiCategory');
const router = express.Router()

router.get('/load-category', async (req, res) => {
    return loadCategory(req, res)
})
router.post('/create-category', async (req, res) => {
    return createCategory(req, res)
})
router.post('/detail-category', async (req, res) => {
    return detailCategory(req, res)
})
router.post('/update-category', async (req, res) => {
    return updateCategory(req, res)
})
router.post('/delete-category', async (req, res) => {
    return deleteCategory(req, res)
})
module.exports = router;