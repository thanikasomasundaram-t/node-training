let { writeFileSync } = require('fs');


module.exports = {
    writeFileService: (path, setRandomColors) => {
        writeFileSync(path, JSON.stringify(Array.from(setRandomColors)));
    }
}