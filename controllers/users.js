
const {response, request} = require("express")


const usersGet = (req, res) => {
    const queryParams = req.query
    res.json({
        msg:'get api - controller',
        ...queryParams
    })
}

const usersPost = (req, res) => {
    const { name, age } = req.body
    res.status(201).json({
        msg:'post api - controller',
        name,
        age
    })
}

const usersPut = (req, res) => {
    const id = req.params.id
    res.status(400).json({
        msg:'put api - controller',
        id
    })
}

const usersPatch = (req, res) => {
    res.json({
        msg:'patch api - controller'
    })
}

const userDelete = (req, res) => {
    res.json({
        msg:'delete api - controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    userDelete
}