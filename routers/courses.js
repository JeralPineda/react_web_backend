const { Router } = require('express');
const { check } = require('express-validator');

const { addCourse, getCourses } = require('../controllers/courses');
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

router.get('/get-courses', getCourses);

module.exports = router;
