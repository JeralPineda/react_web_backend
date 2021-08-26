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
   },
});

// Limitamos la información de la petición a mostrar
MenuSchema.methods.toJSON = function () {
   const { __v, _id, ...menus } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   menus.uid = _id;

   return menus;
};

module.exports = model('Menu', MenuSchema);
