let fs = require('fs');


module.exports = {
    readFile: () => {
        let data = fs.readFileSync('./cdw_ace23_buddies.json');
        return JSON.parse(data);
    },
};