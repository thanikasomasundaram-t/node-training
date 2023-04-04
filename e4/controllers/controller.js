const  { readFile } = require("../services/readFileService");
const  { writeFile } = require("../services/writeFileService");

module.exports = {
    listAll: (req, res, err) => res.send(readFile()),

    addToListController: (req, res, err) =>  {
        let data = readFile();
        data.push(req.body);
        writeFile(data);
        res.send(data);
    },

    getOneFromList: (req, res, err) => {
        let employees = readFile();
        let id = req.params.id;
        employees.forEach((element) => {
            if(element.employeeId == id) {
                res.send(element);
            }
        })
        res.end();
    },

    updateToListController: (req, res, err) => {
        let employees = readFile();
        let updateData = req.body;
        let updatedEmployees = employees.map((element) => 
            element.employeeId == updateData.employeeId
                ? updateData
                : element);
        res.send(updatedEmployees);
        writeFile(updatedEmployees);

    },

    deleteInListController: (req, res, err) => {
        let employees = readFile();
        let id = req.params.id;
        let newEmployees = employees.filter((element) => id != element.employeeId);
        res.send(newEmployees);
        writeFile(newEmployees);
    },
}