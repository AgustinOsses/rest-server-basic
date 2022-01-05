
const {response, request} = require("express")
const bcrypt = require('bcryptjs')
const User = require('../models/user')


const usersGet = async (req, res) => {
    
    const { limit = 5, from = 0 } = req.query
    const query = { state: true}

    const [ users, total ] = await Promise.all([
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
        User.countDocuments(query)
    ])

    res.json({
        total, 
        users
    })
}

const usersPost = async (req, res) => {

    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    await user.save();
    res.status(201).json(user)
}

const usersPut = async (req, res) => {
    const id = req.params.id
    const { _id, password , google, email, ...resto } = req.body;

    if (password) { 
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto, {new: true})


    res.status(400).json(user)
}

const usersPatch = (req, res) => {
    res.json({
        msg:'patch api - controller'
    })
}

const userDelete = async (req, res) => {
    const { id } = await req.params
    const userDel = await User.findByIdAndUpdate(id, { state: false })

    res.json({
        userDel, 
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    userDelete
}