const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generarJWT, refreshToken } = require('../helpers/generar-jwt');

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

module.exports = {
   signIn,
};
