const router = require('express').Router();
const Users = require('../controller/user');

router.post('/register', Users.register)
router.post('/login', Users.login)
router.post('/google-sign-in', Users.googleSingIn)


module.exports = router
