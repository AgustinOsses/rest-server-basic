const {Router} = require('express');
const {check} = require('express-validator');
const { usersGet , usersPost, usersPut, usersPatch, userDelete} = require('../controllers/users');
const {roleValido, existEmail, existUserForId } = require('../helpers/db-validators');
const {validarJWT} = require('../middlewares/validar-jwt');
const {adminRole, tieneRole} = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validations-campos');


const router = Router();

router.get('/', usersGet )

router.post('/',
[
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras.').isLength({ min:6 }),
    check('email', 'El correo no es valido.').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(roleValido),
    validarCampos
],
usersPost)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    check('role').custom(roleValido),
    validarCampos
],
usersPut )

router.patch('/', usersPatch )

router.delete('/:id', [
    validarJWT,
    // adminRole,
    tieneRole('ADMIN_ROLE', 'SALES_ROLE' ),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validarCampos
], userDelete )


module.exports = router 