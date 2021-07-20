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

module.exports = model('User', UserSchema);
