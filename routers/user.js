/*
    Rutas de usuarios / user
    host: api/v1/user
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { signUp, getUsers, getUsersActive } = require('../controllers/user');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post(
   '/signup',
   [
      // middlewares
      //   check('name', 'El nombre es obligatorio').not().isEmpty(),
      //   check('lastName', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      validarCampos,
   ],
   signUp
);

router.get('/users', validarJWT, getUsers);
router.get('/users-active', validarJWT, getUsersActive);

module.exports = router;
