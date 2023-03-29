let { addToListController } = require('../controllers/addToListController');
const express = require("express");
const router = express.Router();



module.exports = {
    router: router.post('/', addToListController),
};