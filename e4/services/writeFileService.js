let fs = require('fs');


module.exports = {
    writeFile: (data) => {
        fs.writeFileSync('./cdw_ace23_buddies.json', JSON.stringify(data));
    }
};