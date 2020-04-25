const router = require('express').Router();
const Tasks = require('./task');
const Users = require('./user');

router.use('/tasks', Tasks)
router.use('/users', Users)

module.exports = router
