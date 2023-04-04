const { readFile } = require("../e4/services/readFileService");
const { writeFile } = require('../e4/services/writeFileService');


module.exports = {
    deleteInListController: (req, res, err) => {
        let employees = readFile();
        let id = req.params.id;
        let newEmployees = employees.filter((element) => id != element.employeeId);
        res.send(newEmployees);
        writeFile(newEmployees);
    },
}