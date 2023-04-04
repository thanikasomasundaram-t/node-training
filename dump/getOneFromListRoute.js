const { getOneFromList } = require('../controllers/getOneFromListController');
const express = require('express');
const router = express.Router();

module.exports = {
    router: router.get('/:id', getOneFromList),
}