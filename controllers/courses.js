const courses = require('../models/courses');
const Course = require('../models/courses');

const addCourse = async (req, res = response) => {
   const body = req.body;

   try {
      const course = new Course(body);

      if (!course) {
         return res.status(400).json({
            code: 400,
            msg: 'No se pudo crear el curso',
         });
      }

      //   situamos el curso creado al final
      course.order = 1000;

      //   Consultamos por el idCourse para verificar si existe
      const courses = await Course.findOne({ idCourse: course.idCourse });

      if (courses) {
         res.status(400).json({
            code: 400,
            msg: 'El curso que esta creando ya existe',
         });
      }

      //   Guardaos en la base de datos
      await course.save();

      res.json({
         code: 200,
         msg: 'Curso creado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   addCourse,
};
