const { Schema, model } = require('mongoose');

const UserSchema = Schema({
   name: {
      type: String,
      //   required: [true, 'El nombre es obligatorio'],
   },
   lastName: {
      type: String,
      //   required: [true, 'El apellido es obligatorio'],
   },
   email: {
      type: String,
      unique: true,
      lowercase: true,
      // formatear a minúsculas, esto se podría hacer en el controller
   },
   password: {
      type: String,
      required: [this.google === false, 'La contraseña es requerida.'],
   },
   role: {
      type: String,
      required: true,
      default: 'admin',
   },
   active: {
      type: Boolean,
      required: true,
      default: false,
   },
});

// Limitamos la información de la petición a mostrar
UserSchema.methods.toJSON = function () {
   const { __v, password, _id, ...usuario } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   usuario.uid = _id;

   return usuario;
};

module.exports = model('User', UserSchema);
