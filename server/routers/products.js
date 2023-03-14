const express = require('express');
const { createProduct, getAllProduct } = require('../services/apiProduct');
const router = express.Router()

router.post('/create', async (req, res) => {
    return createProduct(req, res)
})
router.get('/get-all-products', async (req, res) => {
    return getAllProduct(req, res)
})
module.exports = router;