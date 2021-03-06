/*
    Rutas de usuarios / user
    host: api/v1/user
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { signUp, getUsers, getUsersActive, uploadAvatar, mostrarImagen, updateUser, activateUser, deleteUser, signUpAdmin } = require('../controllers/user');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarArchivoSubir } = require('../middleware/validar-archivo');

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

router.put(
   '/upload-avatar/:id',
   [
      //
      validarArchivoSubir,
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   uploadAvatar
);

router.get('/get-avatar/:avatarName', mostrarImagen);

router.put(
   '/update-user/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   updateUser
);

router.put(
   '/activate-user/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   activateUser
);

router.delete(
   '/delete-user/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   deleteUser
);

router.post(
   '/sign-up-admin',
   [
      //
      validarJWT,
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('lastName', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo es obligatorio').isEmail(),
      check('role', 'El rol es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   signUpAdmin
);

module.exports = router;
