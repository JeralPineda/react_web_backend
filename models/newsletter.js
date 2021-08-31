const { Schema, model } = require('mongoose');

const NewsletterSchema = Schema({
   email: {
      type: String,
      unique: true,
   },
});

// Limitamos la información de la petición a mostrar
NewsletterSchema.methods.toJSON = function () {
   const { __v, _id, ...newslette } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   newslette.uid = _id;

   return newslette;
};

module.exports = model('Newsletter', NewsletterSchema);
