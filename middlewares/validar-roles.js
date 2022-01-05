const {request} = require("express")
const {response} = require("express")

const adminRole = (req = request, res = response, next) => {

  if(!req.user){
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin verificar el token primero'
    })
  }

  const { role, name } = req.user

  if(role !== 'ADMIN_ROLE' ){
    return res.status(500).json({
      msg: `${name} no es admin.`
    })
  }

  next()

}


const tieneRole = ( ...roles ) => {
  return (req, res, next) => {

    if(!req.user){
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin verificar el token primero'
      })
    }



    const { role } = req.user
    
    if(!roles.includes(role)){
      return res.status(401).json({
        msg: 'El servicio requiere uno de estos roles: ADMIN_ROLE SALES_ROLE'
      })

    }


    next()

  }

}


module.exports = {
  adminRole,
  tieneRole
}