const { Router } = require('express');
const { check } = require('express-validator');

const { addMenu, getMenus } = require('../controllers/menu');
const { validarJWT } = require('../middleware/validar-jwt');
// const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post(
   '/add-menu',
   [
      //
      validarJWT,
      //   check('email', 'El correo es obligatorio').isEmail(),
      //   check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      //   validarCampos,
   ],
   addMenu
);

router.get('/get-menus', getMenus);

module.exports = router;
