let { addToListController } = require('./addToListController');
const express = require("express");
const router = express.Router();



module.exports = {
    router: router.post('/', addToListController),
};