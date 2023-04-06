const { readFile, writeFile } = require("../services/fileService");
require('dotenv').config();
const constants = require('../constants');
const devLogger = require('../log/devLogger')

const validateData = (data) => {
    if (data.employeeId && !(/^[0-9]{1,30}$/.test(data.employeeId))
        || data.realName && !(/^[a-zA-z]{1,50}$/.test(data.realName))
        || (data.nickName ? !(/^[a-zA-Z]{1,50}$/.test(data.nickName)) : false)
        || (data.dob ? !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data.dob)) : false)
        || (data.hobbies ? !(Array.isArray(data.hobbies)) : false)) {
        return false;
    }
    return true;

}

const listAll = async (req, res, err) => {
    try {
        res.send(await readFile(constants.READ_FILE_PATH, req, res));
    }
    catch (err) {
        res.send(err);
    }
}

const addToList = async (req, res, err) => {
    try {
        let data = await readFile(constants.READ_FILE_PATH, req, res);
        if(validateData(req.body)) {
            data.push(req.body);
            await writeFile(constants.WRITE_FILE_PATH, data, req, res);
            res.send(data);
        }
        else {
            devLogger.warn(`bad request by client path: ${req.method} ${req.originalUrl}`);
            res.status(400);
            res.send("Invalid input");
        }
    }
    catch(err) {
        res.send(err);
    }

};

const getOneFromList = async (req, res, err) => {
    try {
        let employees = await readFile(constants.READ_FILE_PATH, req, res);
        let id = req.params.id;
        for (element of employees) {
            if (element.employeeId == id) {
                res.send(element);
                return;
            }
        };
        devLogger.warn(`given request not found path: ${req.method} ${req.originalUrl}`);
        res.status(404);
        res.send("buddy doesnot exists")
    }
    catch (err) {
        res.send(err);
    }

};

const updateToList = async (req, res, err) => {
    try {
        let employees = await readFile(constants.READ_FILE_PATH, req, res);
        if (validateData(req.body)) {
            let updateData = req.body;
            let updatedEmployees = employees.map((element) =>
                element.employeeId == updateData.employeeId
                    ? updateData
                    : element);
            await writeFile(constants.WRITE_FILE_PATH, updatedEmployees, req, res);
            res.send(updatedEmployees);
        }
        else {
            devLogger.warn(`bad request by client path: ${req.method} ${req.originalUrl}`);
            res.status(400);
            res.send("Invalid input");
        }
    }
    catch (err) {
        res.send(err);
    }

};

const deleteInList = async (req, res, err) => {
    try {
        let employees = await readFile(constants.READ_FILE_PATH, req, res);
        let id = req.params.id;
        let newEmployees = employees.filter((element) => id != element.employeeId);
        if (newEmployees.length == employees.length) {
            devLogger.warn(`given request not found path: ${req.method} ${req.originalUrl}`);
            res.status(404);
            res.send("buddy not found");
            return;
        }
        await writeFile(constants.WRITE_FILE_PATH, newEmployees, req, res);
        res.send(newEmployees);
    }
    catch (err) {
        res.send(err);
    }
};

module.exports = {
    listAll,
    addToList,
    getOneFromList,
    updateToList,
    deleteInList,
}