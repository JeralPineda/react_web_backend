const { request } = require('express');
const Post = require('../models/post');
const { options } = require('../routers/post');

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

const getPosts = async (req = request, res) => {
   const { page = 1, limit = 10 } = req.query;

   const options = {
      page,
      limit: parseInt(limit),
      sort: { date: 'desc' },
   };

   try {
      const posts = await Post.paginate({}, options);

      if (!posts) {
         return res.status(404).json({
            code: 404,
            msg: 'No se ha encontrado ningun post',
         });
      }

      res.json({
         code: 200,
         posts,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

const updatePost = async (req = request, res) => {
   const data = req.body;
   const { id } = req.params;

   try {
      const post = await Post.findByIdAndUpdate(id, data);

      if (!post) {
         return res.status(404).json({
            code: 404,
            msg: 'No se ha encontrado ningun post',
         });
      }

      res.json({
         code: 200,
         msg: 'Post actualizado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

const deletePost = async (req = request, res) => {
   const { id } = req.params;

   try {
      const post = await Post.findByIdAndRemove(id);

      if (!post) {
         return res.status(404).json({
            code: 404,
            msg: 'No se ha encontrado ningun post',
         });
      }

      res.json({
         code: 200,
         msg: 'Post eliminado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         code: 500,
         msg: 'Hable con el administrador',
      });
   }
};

const getPost = async (req = request, res) => {
   const { url } = req.params;

   try {
      const post = await Post.findOne({ url });

      if (!post) {
         return res.status(404).json({
            code: 404,
            msg: 'No se ha encontrado ningun post',
         });
      }

      res.json({
         code: 200,
         post,
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
   getPosts,
   updatePost,
   deletePost,
   getPost,
};
