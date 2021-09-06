const { Router } = require('express');
// const { check } = require('express-validator');

const { addPost } = require('../controllers/post');
// const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post('/add-post', validarJWT, addPost);

module.exports = router;
