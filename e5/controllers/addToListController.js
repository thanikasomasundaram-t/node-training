const  { readFile }= require("../services/readFileService");
const  { writeFile } = require("../services/writeFileService");




module.exports = {
    addToListController: (req, res, err) =>  {
        let data = readFile();
        data.push(req.body);
        writeFile(data);
        res.send(data);
    }
};