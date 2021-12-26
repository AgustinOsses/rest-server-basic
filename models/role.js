const {Schema, model } = require('mongoose');


const schemaRole = {
    role: {
        type: String,
        required: [true, 'Rol obligatorio']
    }

}


module.exports =  model('Role', schemaRole)