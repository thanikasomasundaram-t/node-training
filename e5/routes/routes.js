const controller = require('../controllers/controller');

const express = require('express');
const router = express.Router();


router.get('/', controller.listAll);

router.get('/:id', controller.getOneFromList);

router.post('/', controller.addToList);

router.put('/', controller.updateToList);

router.delete('/:id', controller.deleteInList);

module.exports = router;
