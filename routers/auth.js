const { Router } = require('express');
const { check } = require('express-validator');

const { signIn, refreshAccessToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post(
   '/signin',
   [
      //
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      validarCampos,
   ],
   signIn
);

router.post('/refresh-access-token', refreshAccessToken);

module.exports = router;
