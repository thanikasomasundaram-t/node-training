const  { readFile }= require("../e4/services/readFileService");
const  { writeFile } = require("../e4/services/writeFileService");




module.exports = {
    addToListController: (req, res, err) =>  {
        let data = readFile();
        data.push(req.body);
        writeFile(data);
        res.send(data);
    }
};