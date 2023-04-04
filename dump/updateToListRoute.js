const { updateToListController } = require('../controllers/updateToListController');

const express = require('express');
const router = express.Router();

module.exports = {
    router: router.put('/', updateToListController),
}