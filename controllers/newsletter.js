const { response } = require('express');
const Newsletter = require('../models/newsletter');

const suscribeEmail = async (req, res = response) => {
   const { email } = req.params;

   if (!email) {
      return res.status(400).json({
         code: 400,
         msg: 'El email es obligatorio',
      });
   }

   try {
      let newsletters = await Newsletter.findOne({ email });

      //   verificar que el usuario existe
      if (newsletters) {
         return res.status(400).json({
            msg: 'Error al registrar en la newsletter',
         });
      }

      const data = {
         email: email.toLowerCase(),
      };

      //   creamos nueva suscripción
      newsletters = new Newsletter(data);

      //   grabar en la base de datos
      await newsletters.save();

      res.status(201).json({
         msg: 'Email registrado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'El email ya existe',
      });
   }
};

module.exports = {
   suscribeEmail,
};
