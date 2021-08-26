const { response } = require('express');

const Menu = require('../models/menu');

const addMenu = (req, res = response) => {
   res.json({
      msg: 'menu',
   });
};

module.exports = {
   addMenu,
};
