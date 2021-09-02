const { Router } = require('express');
const { check } = require('express-validator');

const { addCourse } = require('../controllers/courses');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post(
   '/add-course',
   [
      //
      validarJWT,
      //   check('email', 'El correo es obligatorio').isEmail(),
      //   check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      //   validarCampos,
   ],
   addCourse
);

module.exports = router;
