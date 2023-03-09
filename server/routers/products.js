const express = require('express');
const { createProduct } = require('../services/apiProduct');
const router = express.Router()

router.post('/create', async (req, res) => {
    return createProduct(req, res)
})
module.exports = router;