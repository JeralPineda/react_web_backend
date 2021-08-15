const jwt = require('jsonwebtoken');

const generarJWT = (uid = '', name = '', lastName = '', email = '', rol = '') => {
   return new Promise((resolve, reject) => {
      const payload = { uid, name, lastName, email, rol };

      // Generar el token
      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: '1hr',
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject('No se pudo generar el jsonwebtoken');
            } else {
               resolve(token);
            }
         }
      );
   });
};

module.exports = {
   generarJWT,
};
