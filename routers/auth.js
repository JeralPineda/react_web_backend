const { Router } = require('express');

const { signIn } = require('../controllers/auth');

const router = Router();

router.post('/signin', signIn);

module.exports = router;
