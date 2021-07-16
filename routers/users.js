/*
    Rutas de usuarios / auth
    host: api/auth
*/

const { Router, response } = require('express');

const router = Router();

router.get('/', (req, res = response) => {
   res.json({
      msg: 'Hola mundo',
   });
});

module.exports = router;
