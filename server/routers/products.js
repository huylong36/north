const express = require('express');
const { createProduct, getAllProduct, updateProduct, getDetailById, deleteProduct } = require('../services/apiProduct');
const router = express.Router()

router.post('/create', async (req, res) => {
    return createProduct(req, res)
})
router.get('/get-all-products', async (req, res) => {
    return getAllProduct(req, res)
})
router.get('/get-detail-product/:id', async (req, res) => {
    return getDetailById(req, res)
})
router.post('/update-product', async (req, res) => {
    return updateProduct(req, res)
})
router.post('/delete-product', async (req, res) => {
    return deleteProduct(req, res)
})
module.exports = router;