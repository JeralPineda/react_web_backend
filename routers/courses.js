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
   ],
   addCourse
);

module.exports = router;
