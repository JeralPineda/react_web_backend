const { request } = require('express');
const Post = require('../models/post');

const addPost = async (req = request, res) => {
   const { title, url, description, date } = req.body;

   const data = {
      title,
      url,
      description,
      date,
   };

   try {
      const post = new Post(data);

      if (!post) {
         return res.status(400).json({
            code: 400,
            msg: 'No se ha podido crear el post',
         });
      }

      const consulta = await Post.findOne({ url });

      if (consulta) {
         return res.status(400).json({
            code: 400,
            msg: `El post con esta url: ${url} ya fue creado`,
         });
      }

      //   guardando en la base de datos
      await post.save();

      res.json({
         code: 200,
         msg: 'Post creado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   addPost,
};
