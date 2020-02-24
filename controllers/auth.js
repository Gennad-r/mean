const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (!candidate) {
        res.status(404).json({
            message: 'User with this email does not exist!'
        })
        return
    }
    const passCheck = bcrypt.compareSync(req.body.password, candidate.password)
    if (!passCheck) {
        res.status(401).json({
            message: 'Password is wrong!'
        })
        return
    } else {
        const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
        }, keys.jwt, {expiresIn: 3600})
        res.status(200).json({
            token: `Bearer ${token}`
        })
    }
}

module.exports.register = async function(req, res) {

    try {
        const candidate = await User.findOne({email: req.body.email})
        
        if (candidate) {
            res.status(409).json({
                message: 'This email is already registered!'
            })
            return
        }
        if (!validator.isEmail(req.body.email)) {
            res.status(412).json({
                message: 'Invalid email! Check it please.'
            })
            return
        }
        const password = req.body.password
        if (password.length < 6) {
            res.status(412).json({
                message: 'Password must be 6 symbols at least'
            })
            return
        }
        if (password.length > 16) {
            res.status(412).json({
                message: 'Password maximum length is 16 symbols'
            })
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        await user.save()
        res.status(201).json({
            message: 'New user was created'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}