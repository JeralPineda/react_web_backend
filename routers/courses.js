const { Router } = require('express');
const { check } = require('express-validator');

const { addCourse, getCourses, deleteCourse } = require('../controllers/courses');
const { validarCampos } = require('../middleware/validar-campos');
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

router.delete(
   '/delete-course/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   deleteCourse
);

module.exports = router;
