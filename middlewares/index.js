const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validations-campos');


module.exports = {
  ...validarJWT,
  ...validaRoles,
  ...validarCampos
}