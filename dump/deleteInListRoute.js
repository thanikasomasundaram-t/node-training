let { deleteInListController } = require('../controllers/deleteInListController');
const express = require("express");
const router = express.Router();



module.exports = {
    router: router.delete('/:id', deleteInListController),
};