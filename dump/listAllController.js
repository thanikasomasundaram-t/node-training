const { readFile } = require('../services/readFileService');


module.exports = {
    listAll: (req, res, err) => res.send(readFile()),
}