const Role = require('../models/role')
const User = require('../models/user')

const roleValido =  async (role = null ) => {
    const existRole = await Role.findOne({ role })
    console.log(existRole);
    if(!existRole) {
        throw new Error(`El rol ${role} no existe en la DB.`)
    }
}

const existEmail = async (email = null) => {
    const emailExist = await User.findOne({email})
    
    if (emailExist) {
        throw new Error(`El email ${email} ya existe.`)
    }
}

const existUserForId = async (id) => {
    const IdExist = await User.findById(id)
    
    if (!IdExist) {
        throw new Error(`El id ${id} no existe.`)
    }
}

module.exports = {
    roleValido,
    existEmail,
    existUserForId
}