const jwt = require('jsonwebtoken')
const secret = 'mysecret';
const User = require('../models/User')
const argon2 = require('argon2')
const register = async (req, res) => {
    const { username, password, phone, email } = req.body
    try {
        const user = req.body
        const data = await User.create(user)
        await data.save();
        const payload = { userId: data._id };
        const accessToken = jwt.sign(payload, secret);
        res.json({
            success: true,
            message: "Tạo tài khoản thành công !",
            data,
            accessToken
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Tạo tài khoản thất bại !" });
    }
}
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' })

    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        }
        const payload = { userId: user._id };
        const accessToken = jwt.sign(payload, secret);
        return res.status(200).json({ success: true, message: 'User logged in successfully', accessToken, user })
    } catch (error) {
        console.log(error);
    }
}
const getUserFromToken = async (req, res) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, secret)
        const user = await User.findOne({ _id: decoded.userId })

        return res.status(200).json({ success: true, message: "access token succesfully", user })
    } catch (error) {
        console.log(error);
    }
}
module.exports = { register, login, getUserFromToken };