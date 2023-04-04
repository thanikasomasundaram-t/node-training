let fs = require('fs');

module.exports = {
    createFile: () => {
        fs.writeFileSync('./cdw_ace23_buddies.json', "[]","utf-8");
        console.log('file created');
    },
};