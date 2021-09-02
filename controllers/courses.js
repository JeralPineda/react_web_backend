const Course = require('../models/courses');

const addCourse = (req, res = response) => {
   try {
      res.json({
         msg: 'Add Course',
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
