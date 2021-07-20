const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const signUp = (req, res = response) => {
   res.json({
      msg: 'Endpoint de signUp',
   });
};

module.exports = {
   signUp,
};
