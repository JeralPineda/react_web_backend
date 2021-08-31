const { response } = require('express');
const Newsletter = require('../models/newsletter');

// const suscribeEmail = async (req, res = response) => {
//    const { email } = req.params;

//    if (!email) {
//       return res.status(400).json({
//          code: 400,
//          msg: 'El email es obligatorio',
//       });
//    }

//    try {
//       let newsletters = await Newsletter.findOne({ email });

//       //   verificar que el usuario existe
//       if (newsletters) {
//          return res.status(400).json({
//             msg: 'Error al registrar en la newsletter',
//          });
//       }

//       const data = {
//          email: email.toLowerCase(),
//       };

//       //   creamos nueva suscripción
//       newsletters = new Newsletter(data);

//       //   grabar en la base de datos
//       await newsletters.save();

//       res.status(201).json({
//          msg: 'Email registrado correctamente',
//       });
//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          msg: 'El email ya existe',
//       });
//    }
// };

function suscribeEmail(req, res) {
   const email = req.params.email;
   const newsletter = new Newsletter();

   if (!email) {
      res.status(404).send({ code: 404, message: 'El email es obligatorio' });
   } else {
      newsletter.email = email.toLowerCase();
      newsletter.save((err, newsletterStore) => {
         if (err) {
            res.status(500).send({ code: 500, message: 'El email ya existe.' });
         } else {
            if (!newsletterStore) {
               res.status(400).send({
                  code: 400,
                  message: 'Error al registrar en la newsletter.',
               });
            } else {
               res.status(200).send({ code: 200, message: 'Email registrado correctamente.' });
            }
         }
      });
   }
}

module.exports = {
   suscribeEmail,
};
