const { Router } = require('express');
const { check } = require('express-validator');

const { addCourse, getCourses, deleteCourse, updateCourse } = require('../controllers/courses');
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

router.put(
   '/update-course/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   updateCourse
);

module.exports = router;
