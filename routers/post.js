const { Router } = require('express');
const { check } = require('express-validator');

const { addPost, getPosts, updatePost } = require('../controllers/post');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post('/add-post', validarJWT, addPost);

router.get('/get-posts', getPosts);

router.put(
   '/update-post/:id',
   [
      //
      validarJWT,
      check('id', 'el id debe de ser de Mongo').isMongoId(),
      validarCampos,
   ],
   updatePost
);

module.exports = router;
