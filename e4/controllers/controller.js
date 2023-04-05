const  { readFile, writeFile } = require("../services/fileService");


const listAll = (req, res, err) => res.send(readFile()); 

const addToList = (req, res, err) =>  {
    let data = readFile();
    data.push(req.body);
    writeFile(data);
    res.send(data);
};

const getOneFromList = (req, res, err) => {
    let employees = readFile();
    let id = req.params.id;
    employees.forEach((element) => {
        if(element.employeeId == id) {
            res.send(element);
        }
    })
    res.end();
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