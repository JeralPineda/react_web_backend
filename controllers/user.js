const { response } = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const User = require('../models/user');
const { subirArchivo } = require('../helpers/subir-archivo');

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
      const users = await User.find();

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

const getUsersActive = async (req, res = response) => {
   const { active } = req.query;

   try {
      //   const [users] = await Promise.all([User.find({ active })]);
      const users = await User.find({ active });

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

const uploadAvatar = async (req, res = response) => {
   const { id } = req.params;

   try {
      const modelo = await User.findById(id);

      console.log(modelo);

      if (!modelo) {
         return res.status(400).json({
            msg: `No se ha encontrado ningún usuario`,
         });
      }

      // Directorio donde se guardara la imagen
      const nombre = await subirArchivo(req.files, undefined, 'avatar');

      modelo.avatar = nombre;

      // Guardamos en la BD
      await modelo.save();

      res.json({ user: modelo.avatar });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const mostrarImagen = (req, res = response) => {
   const { avatarName } = req.params;
   const filePath = './uploads/avatar/' + avatarName;

   try {
      if (!fs.existsSync(filePath)) {
         return res.status(400).json({
            msg: `El avatar que buscas no existe.`,
         });
      }

      //   Mandamos el archivo
      res.sendFile(path.resolve(filePath));
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const updateUser = async (req, res = response) => {
   const { id } = req.params;
   const userData = req.body;

   try {
      const user = await User.findByIdAndUpdate(id, userData);

      if (!user) {
         res.status(400).json({
            msg: 'No se ha encontrado ningún usuario',
         });
      }

      res.json({
         msg: 'Usuario actualizado correctamente',
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
   getUsersActive,
   uploadAvatar,
   mostrarImagen,
   updateUser,
};
