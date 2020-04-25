const router = require('express').Router();
const Tasks = require('../controller/task');
const Authentication = require('../middlewares/Authentication');
const Authorization = require('../middlewares/Authorization');

//!read
router.get('/show', Tasks.getTasks)

//!getOne
router.get('/show/:id', [Authentication, Authorization], Tasks.getOneTask)

//!create
router.post('/create', Authentication, Tasks.createTask)

//!delete
router.delete('/delete/:id', [Authentication, Authorization], Tasks.deleteTask)

//!update
router.put('/edit/:id', [Authentication, Authorization], Tasks.updateTask)


module.exports = router
