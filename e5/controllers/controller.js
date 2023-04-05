const { readFile, writeFile } = require("../services/fileService");
require('dotenv').config();

const validateData = (data) => {
    if (data.employeeId && !(/^[0-9]{1,30}$/.test(data.employeeId))
        || data.realName && !(/^[a-zA-z]{1,50}$/.test(data.realName))
        || (data.nickName ? !(/^[a-zA-Z]{1,50}$/.test(data.nickName)) : false)
        || (data.dob ? !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data.dob)) : false)
        || (data.hobbies ? !(Array.isArray(data.hobbies)) : false)) {
        return false;
    }
    // if(data.realName && !(/^[a-zA-z]{1,50}$/.test(data.realName))) {
    //     return false;
    // }
    // if(data.nickName? !(/^[a-zA-Z]{1,50}$/.test(data.nickName)) : false) {
    //     return false;
    // }
    // if(data.dob? !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data.dob)) : false) {
    //     return false;
    // }
    // if(data.hobbies? !(Array.isArray(data.hobbies)): false) {
    //     return false;
    // }
    return true;

}

const listAll = async (req, res, err) => {
    try {
        res.send(await readFile(process.env.READ_FILE_PATH));
    }
    catch (err) {
        res.send(err);
    }
}

const addToList = async (req, res, err) => {
    try {
        let data = await readFile(process.env.READ_FILE_PATH);
        if (validateData(req.body)) {
            data.push(req.body);
            await writeFile(process.env.WRITE_FILE_PATH, data);
            res.send(data);
        }
        else {
            res.send("Invalid input");
        }
    }
    catch (err) {
        res.send(err);
    }

};

const getOneFromList = async (req, res, err) => {
    try {
        let employees = await readFile(process.env.READ_FILE_PATH);
        let id = req.params.id;
        for (element of employees) {
            if (element.employeeId == id) {
                res.send(element);
                return;
            }
        };
        res.send("buddy doesnot exists")
    }
    catch (err) {
        res.send(err);
    }

};

const updateToList = async (req, res, err) => {
    try {
        let employees = await readFile(process.env.READ_FILE_PATH);
        if (validateData(req.body)) {
            let updateData = req.body;
            let updatedEmployees = employees.map((element) =>
                element.employeeId == updateData.employeeId
                    ? updateData
                    : element);
            await writeFile(process.env.WRITE_FILE_PATH, updatedEmployees);
            res.send(updatedEmployees);
        }
        else {
            res.send("Invalid Input")
        }
    }
    catch (err) {
        res.send(err);
    }

};

const deleteInList = async (req, res, err) => {
    try {
        let employees = await readFile(process.env.READ_FILE_PATH);
        let id = req.params.id;
        let newEmployees = employees.filter((element) => id != element.employeeId);
        if (newEmployees.length == employees.length) {
            res.send("buddy not found");
            return;
        }
        await writeFile(process.env.WRITE_FILE_PATH, newEmployees);
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