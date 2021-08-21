const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const signUp = async (req, res = response) => {
   const { lastName, name, password, email } = req.body;

   try {
      let user = await User.findOne({ email });

      //   verificar que el usuario existe
      if (user) {
         return res.status(400).json({
            msg: 'El usuario ya existe',
         });
      }

      user = new User(req.body);

      //   encriptar la contraseña
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      //   grabar en la base de datos
      await user.save();

      res.status(201).json({
         user,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const getUsers = async (req, res = response) => {
   try {
      const [users] = await Promise.all([User.find()]);

      if (!users) {
         res.status(404).json({
            msg: 'No se ha encontrado ningún usuario',
         });
      }

      res.json({
         users,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   signUp,
   getUsers,
};
