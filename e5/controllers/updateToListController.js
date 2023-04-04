const { readFile } = require('../services/readFileService');
const  { writeFile } = require('../services/writeFileService');

module.exports = {
    updateToListController: (req, res, err) => {
        let employees = readFile();
        let updateData = req.body;
        let updatedEmployees = employees.map((element) => 
            element.employeeId == updateData.employeeId
                ? updateData
                : element);
        res.send(updatedEmployees);
        writeFile(updatedEmployees);

    }
}