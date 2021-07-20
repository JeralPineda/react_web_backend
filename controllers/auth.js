const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const signIn = (req, res = response) => {
   //    const user = new user();
   res.json({
      msg: 'Endpoint de signIn',
   });
};

module.exports = {
   signIn,
};
