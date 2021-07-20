const { Schema, model } = require('mongoose');

const UserSchema = Schema({
   name: String,
   lastName: String,
   email: {
      type: String,
      unique: true,
   },
   password: String,
   role: String,
   active: Boolean,
});

// Limitamos la información de la petición a mostrar
UserSchema.methods.toJSON = function () {
   const { __v, password, _id, ...usuario } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   usuario.uid = _id;

   return usuario;
};

module.exports = model('User', UserSchema);
