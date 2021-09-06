const { now } = require('moment');
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = Schema(
   {
      title: {
         type: String,
      },
      url: {
         type: String,
         unique: true,
      },
      description: {
         type: String,
      },
      date: {
         type: Date,
         //  default: Date.now, //fecha por defecto
      },
   },
   {
      //fecha de creacion y de actualizacion
      //   timestamps: true,
   }
);

PostSchema.plugin(mongoosePaginate);

// Limitamos la información de la petición a mostrar
PostSchema.methods.toJSON = function () {
   const { __v, _id, ...post } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   post.uid = _id;

   return post;
};

module.exports = model('Post', PostSchema);
