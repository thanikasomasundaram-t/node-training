const  { readFile, writeFile } = require("../services/fileService");


const listAll = (req, res, err) => res.send(readFile()); 

const checkUnique = (data, inputData) => {
    for(element of data) {
        if(element.employeeId === inputData.employeeId) {
            return true;
        }
    }
    return false;
}

const addToList = (req, res, err) =>  {
    let data = readFile();
    if(req.body == {} || checkUnique(data, req.body)) {
        res.send("invalid input");
        return;
    }
    data.push(req.body);
    writeFile(data);
    res.send(data);
};

const getOneFromList = (req, res, err) => {
    let employees = readFile();
    let id = req.params.id;
    for(element of employees) {
        if(element.employeeId == id) {
            res.send(element);
            return;
        }
    }
    res.end("id doesnot exists");
};

const updateToList =  (req, res, err) => {
    let employees = readFile();
    let updateData = req.body;
    let updatedEmployees = employees.map((element) => 
        element.employeeId == updateData.employeeId
            ? updateData
            : element);
    res.send(updatedEmployees);
    writeFile(updatedEmployees);

};

const deleteInList = (req, res, err) => {
    let employees = readFile();
    let id = req.params.id;
    let newEmployees = employees.filter((element) => id != element.employeeId);
    if(newEmployees.length === employees.length) {
        res.send("id not exists");
        return;
    }
    res.send(newEmployees);
    writeFile(newEmployees);
};

module.exports = {
    listAll,
    addToList,
    getOneFromList,
    updateToList,
    deleteInList,
}