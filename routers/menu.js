const { Router } = require('express');
const { check } = require('express-validator');

const { addMenu, getMenus, updateMenu, activateMenu } = require('../controllers/menu');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

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

router.put('/update-menu/:id', [validarJWT, check('id', 'el id debe de ser de Mongo').isMongoId(), validarCampos], updateMenu);

router.put('/activate-menu/:id', [validarJWT, check('id', 'el id debe de ser de Mongo').isMongoId(), validarCampos], activateMenu);

module.exports = router;
