const jwt = require('jsonwebtoken')
const secret = 'mysecret';
const User = require('../models/User')
const argon2 = require('argon2')
const register = async (req, res) => {
    const { username, password, phone, email, userRole } = req.body
    try {
        const user = req.body
        user.userRole = 1
        const data = await User.create(user)
        await data.save();
        const payload = { userId: data._id };
        const accessToken = jwt.sign(payload, secret);
        res.json({
            success: true,
            message: "Create account successfully !",
            data,
            accessToken
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Create account failed !" });
    }
}
const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        const payload = { userId: user._id };
        const accessToken = jwt.sign(payload, secret);
        return res.status(200).json({ success: true, message: 'Login successfully !', accessToken, user })
    } catch (error) {
        if (!password) {
            throw new Error("Wrong password")
        } else {
            throw new Error("Login failed")
        }
    }
}
const getUserFromToken = async (req, res) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, secret)
        const user = await User.findOne({ _id: decoded.userId })

        return res.status(200).json({ success: true, message: "successful token access !", user })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { register, login, getUserFromToken };