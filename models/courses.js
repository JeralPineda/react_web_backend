const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
   idCourse: {
      type: Number,
      unique: true,
      require: true,
   },
   link: {
      type: String,
   },
   coupon: {
      type: String,
   },
   price: {
      type: Number,
   },
   order: {
      type: Number,
   },
});

// Limitamos la información de la petición a mostrar
CourseSchema.methods.toJSON = function () {
   const { __v, _id, ...course } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   course.uid = _id;

   return course;
};

module.exports = model('Course', CourseSchema);
