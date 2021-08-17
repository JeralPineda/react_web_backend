const jwt = require('jsonwebtoken');

const generarJWT = ({ id, name, lastName, email, role }) => {
   return new Promise((resolve, reject) => {
      const payload = { id, name, lastName, email, role };

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

const refreshToken = (id) => {
   return new Promise((resolve, reject) => {
      const payload = { id };

      // Generar el token
      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: '2hr',
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
   refreshToken,
};
