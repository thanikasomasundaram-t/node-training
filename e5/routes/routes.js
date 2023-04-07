const controller = require('../controller/controller');

const express = require('express');
const router = express.Router();

router.get('/', controller.getAllBuddy);

router.get('/:id', controller.getBuddy);

router.post('/', controller.addBuddy);

router.put('/', controller.editBuddy);

router.delete('/:id', controller.deleteBuddy);


module.exports = router;
