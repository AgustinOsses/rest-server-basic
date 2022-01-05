const {request, response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const validarJWT = async (req = request, res = response , next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion.'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPROVATEKEY)

        const userAuth = await User.findById(uid)
        //Verificar si el uid tiene estados en true

        if(!userAuth) {
          return res.status(401).json({
            msg: 'Token no valido - usuario no existe'
        })

        }
        
        if (!userAuth.state){
            return res.status(401).json({
                msg: 'Token no valido - state false'
            })
        }
        
        req.user = userAuth;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}