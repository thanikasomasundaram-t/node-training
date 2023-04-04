const { addToListController } = require('../controllers/addToListController');
const { authenticateData } = require('../services/authenticateData');
const express = require("express");
const router = express.Router();



module.exports = {
    router: router.post('/', authenticateData, addToListController),
};