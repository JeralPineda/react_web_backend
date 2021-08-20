const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generarJWT, refreshToken } = require('../helpers/generar-jwt');
const { willExpiredToken } = require('../middleware/validar-jwt');

const signIn = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      // Verificar si el corro existe
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            msg: 'El usuario o la contraseña son incorrectos',
         });
      }

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
         return res.status(400).json({
            msg: 'El usuario o la contraseña son incorrectos',
         });
      }

      // Verificar si el usuario esta activo
      if (!user.active) {
         return res.status(400).json({
            msg: 'El usuario no se ha activado',
         });
      }

      //Generar el JWT
      const token = await generarJWT(user);

      //   Generar el refreshToken
      const refresh = await refreshToken(user.id);

      res.status(200).json({
         accessToken: token,
         refreshToken: refresh,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const refreshAccessToken = async (req, res = response) => {
   const { refreshToken } = req.body;

   if (!refreshToken) {
      return res.status(404).json({
         msg: 'El token es obligatorio',
      });
   }

   try {
      const { id, isTokenExpired } = willExpiredToken(refreshToken);

      if (isTokenExpired) {
         return res.status(404).json({
            msg: 'El refreshToken ha expirado',
         });
      }

      //   consultamos el usuario en la BD con el id del token
      const user = await User.findById(id);

      //   verificamos que exista el usuario
      if (!user) {
         return res.status(404).json({
            msg: 'Usuario no encontrado',
         });
      }

      //Generar el JWT
      const token = await generarJWT(user);

      res.json({
         accessToken: token,
         refreshToken,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   signIn,
   refreshAccessToken,
};
