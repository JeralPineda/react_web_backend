const { response, request } = require('express');
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

const getCourses = async (req, res = response) => {
   try {
      const courses = await Course.find().sort({ order: 'asc' });

      if (!courses) {
         return res.status(400).json({
            code: 400,
            msg: 'No se ha encontrado ningún elemento en el cursos',
         });
      }

      res.json({
         code: 200,
         courses,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

const deleteCourse = async (req = request, res) => {
   const { id } = req.params;

   try {
      const course = await Course.findByIdAndRemove(id);

      if (!course) {
         return res.status(400).json({
            code: 400,
            msg: 'No se ha encontrado ningún curso',
         });
      }

      res.json({
         code: 200,
         msg: 'El curso ha sido eliminado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

const updateCourse = async (req = request, res) => {
   const body = req.body;
   const { id } = req.params;

   try {
      const course = await Course.findByIdAndUpdate(id, body);

      if (!course) {
         return res.status(404).json({
            code: 404,
            msg: 'No se ha encontrado ningún curso',
         });
      }

      res.json({
         code: 200,
         msg: 'Curso actualizado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   addCourse,
   getCourses,
   deleteCourse,
   updateCourse,
};
