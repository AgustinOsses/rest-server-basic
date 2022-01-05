
const bcryptjs = require("bcryptjs")
const {response, request} = require("express")
const {generarJWT} = require("../helpers/generar-jwt")

const Usuario = require('../models/user')

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await Usuario.findOne({email})
    
    try {

        //Verificar si el email existe
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - email'
            })
        }
        //Verificar si el usuario existe 
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - status'
            })
        }

        //Verificar contraseña
        
        const validPass = bcryptjs.compareSync(password, user.password)

        if (!validPass){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - password'
            })
        }

        //Generar JWT
        const token  = await generarJWT(user.id)


        res.json({
            user,
            token
        
    })} catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, comuniquese con el admin.'
        })
    }


}


module.exports = {
    login
}