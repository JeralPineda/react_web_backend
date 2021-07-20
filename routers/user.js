/*
    Rutas de usuarios / auth
    host: api/auth
*/

const { Router } = require('express');

const { signUp } = require('../controllers/user');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post(
   '/signup',

   signUp
);

module.exports = router;
