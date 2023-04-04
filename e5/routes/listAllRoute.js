const { listAll } = require('../controllers/listAllController');
const express = require('express');
const router = express.Router();

module.exports = {
    router: router.get('/', listAll),
}