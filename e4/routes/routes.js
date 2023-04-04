const controller = require('../controllers/controller');

const express = require('express');
const router = express.Router();


router.get('/', controller.listAll);

router.get('/:id', controller.getOneFromList);

router.post('/', controller.addToListController);

router.put('/', controller.updateToListController);

router.delete('/:id', controller.deleteInListController);

module.exports = router;
