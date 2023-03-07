const express = require('express');
const { register, login, getUserFromToken } = require('../services/apiAuth');
const router = express.Router()


router.post('/register-user', async (req, res) => {
    return register(req, res)
})
router.post('/login', async (req, res) => {
    return login(req, res)
})
router.get('/get-user-from-token', async (req, res) => {
    return getUserFromToken(req, res)
})
module.exports = router;