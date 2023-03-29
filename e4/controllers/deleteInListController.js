const { readFile } = require("../services/readFileService");
const { writeFile } = require('../services/writeFileService');


module.exports = {
    deleteInListController: (req, res, err) => {
        let employees = readFile();
        let id = req.params.id;
        let newEmployees = employees.filter((element) => id != element.employeeId);
        res.send(newEmployees);
        writeFile(newEmployees);
    },
}