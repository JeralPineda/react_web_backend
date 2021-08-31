const { Router } = require('express');
const { check } = require('express-validator');

const { suscribeEmail } = require('../controllers/newsletter');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post(
   '/suscribe-newsletter/:email',
   [
      // middlewares
      //   check('name', 'El nombre es obligatorio').not().isEmpty(),
      //   check('lastName', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo es obligatorio').isEmail(),

      validarCampos,
   ],
   suscribeEmail
);

module.exports = router;
