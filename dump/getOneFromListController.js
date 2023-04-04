const { readFile } = require('../services/readFileService');
module.exports = {
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
}