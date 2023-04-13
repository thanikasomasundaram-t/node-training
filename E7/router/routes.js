const router = require('express').Router();
const { authenticateToken } = require('../middleware/middleware');
const controller = require('../controller/controller');


//account creattion 
router.post('/signup', controller.signup);

router.post('/login', controller.login);


//CRUD
//create tasks
router.post('/', authenticateToken, controller.addTask);

//list all tasks created
router.get('/', authenticateToken, controller.findService);

//list a specific tasks
router.get('/:id', authenticateToken, controller.getTaskById);

//update tasks
router.put('/:id', authenticateToken, controller.updateTask);

//delete tasks
router.delete('/:id', authenticateToken, controller.deleteTask);

//FEATURES
//filter tasks
router.get('/filter', authenticateToken, controller.filterTasks);

//sort tasks
router.get('/sort', controller.sortTasks);


module.exports = router;