let { readFile } = require('fs'); 

module.exports = {
    readFileService: (path) => {
        return new Promise((resolve, reject) => {
            readFile(path, 'utf-8', (err, data) => {
                if(err) {
                    console.log(err);
                    reject("File not Found");
                    return;
                }
                try {
                    data = JSON.parse(data);
                }
                catch(err) {
                    reject("Cannot read data");
                    return;
                }
                if(data.length == 0) {
                    reject("Empty");
                    return;
                }
                if(data.length < 5) {
                    reject("Insufficient Content");
                    return;
                }
                resolve(data);


            })
        })

    }
}