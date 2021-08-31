const Newsletter = require('../models/newsletter');

const suscribeEmail = (req, res = response) => {
   const { email } = req.params;

   try {
      res.json({
         email,
         msg: 'Newsletter',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   suscribeEmail,
};
