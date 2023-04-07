const { readFile, writeFile } = require("../utils/fileIO");
const constants = require('../constants');
const devLogger = require('../utils/devLogger');
const service = require('../services/controllerService');
require('dotenv').config();




const getAllBuddy = async (req, res, err) => {
    try {
        res.send(await readFile(constants.READ_FILE_PATH));
    }
    catch (err) {
        devLogger(err, req, res);
        res.status(err.status);
        res.send(err.message);
    }
}

const getBuddy = async (req, res, err) => {
    try {
        let buddies = await readFile(constants.READ_FILE_PATH);
        let buddy = service.getBuddy(buddies, service.validateId(req.params.id));
        res.send(buddy);
    }
    catch (err) {
        devLogger(err, req, res);
        res.status(err.status);
        res.send(err.message);
    }
};

const addBuddy = async (req, res, err) => {
    try {
        let buddies = await readFile(constants.READ_FILE_PATH);
        service.validateBuddy(req.body);
        service.checkUniqueBuddy(buddies, req.body)
        const updatedBuddies = service.addBuddy(buddies, req.body);
        await writeFile(constants.WRITE_FILE_PATH, buddies);
        res.status(201);
        res.send(updatedBuddies);
    }
    catch (err) {
        devLogger(err, req, res);
        res.status(err.status);
        res.send(err.message);
    }
};


const editBuddy = async (req, res, err) => {
    try {
        let buddies = await readFile(constants.READ_FILE_PATH);
        service.validateBuddy(req.body);
        const updatedBuddies = service.editBuddy(buddies, req.body);
        await writeFile(constants.WRITE_FILE_PATH, updatedBuddies);
        res.status(200);
        res.send(updatedBuddies);
    }
    catch (err) {
        devLogger(err, req, res);
        res.status(err.status);
        res.send(err.message);
    }
};

const deleteBuddy = async (req, res, err) => {
    try {
        let buddies = await readFile(constants.READ_FILE_PATH);
        const newBuddies = service.deleteBuddy(buddies, service.validateId(req.params.id));
        await writeFile(constants.WRITE_FILE_PATH, newBuddies);
        res.send(newBuddies);
    }
    catch (err) {
        devLogger(err, req, res);
        res.status(err.status);
        res.send(err.message);
    }
};

module.exports = {
    getAllBuddy,
    addBuddy,
    getBuddy,
    editBuddy,
    deleteBuddy,
}