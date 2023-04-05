let fs = require('fs');


const createFile = () => {
    fs.writeFileSync('./cdw_ace23_buddies.json', "[]","utf-8");
    console.log('file created');
};

const readFile =  () => {
    let data = fs.readFileSync('./cdw_ace23_buddies.json');
    return JSON.parse(data);
};

const writeFile = (data) => {
    fs.writeFileSync('./cdw_ace23_buddies.json', JSON.stringify(data));
}

module.exports = {
    createFile,
    readFile,
    writeFile,
}