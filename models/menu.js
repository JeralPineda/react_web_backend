const { Schema, model } = require('mongoose');

const MenuSchema = Schema({
   title: {
      type: String,
   },
   url: {
      type: String,
   },
   order: {
      type: Number,
   },
   active: {
      type: Boolean,
      default: false,
   },
});

// Limitamos la información de la petición a mostrar
MenuSchema.methods.toJSON = function () {
   const { __v, _id, ...menu } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   menu.uid = _id;

   return menu;
};

module.exports = model('Menu', MenuSchema);
