const express = require('express');
const { createProduct, getAllProduct, updateProduct } = require('../services/apiProduct');
const router = express.Router()

router.post('/create', async (req, res) => {
    return createProduct(req, res)
})
router.get('/get-all-products', async (req, res) => {
    return getAllProduct(req, res)
})
router.post('/update-product/:id', async (req, res) => {
    return updateProduct(req, res)
})
module.exports = router;