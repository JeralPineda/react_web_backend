const { request } = require('express');
// const Post = require('../models/post');

const addPost = (req = request, res) => {
   try {
      res.json({
         code: 200,
         msg: 'add post',
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
