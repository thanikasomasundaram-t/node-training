let fs = require("fs");
const devLogger = require("../log/devLogger");

const createFile = (path, req, res) => {
  return new Promise((resolve, reject) => {
   try {
      fs.writeFileSync(path,"[]", "utf-8");
      resolve();
    }
    catch(err) {
      devLogger.error(`${err.message} path: ${req.method} ${req.originalUrl}`);
      res.status(500);
      reject("File cannot be created");
    }
  });
};

const readFile = (path,req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(path);
      resolve(JSON.parse(data));
    }
    catch(err) {
      devLogger.error(`${err.message} path: ${req.method} ${req.originalUrl}`);
      res.status(500);
      reject("File not Found");
    }
  });
};

const writeFile = (path, data, req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if(!fs.existsSync(path)) {
        devLogger.warn(`File doesnot exists path: ${req.method} ${req.originalUrl}`);
        reject("File doesnot exists");
        return;
      }
      fs.writeFileSync(path, JSON.stringify(data));
      resolve();
    }
    catch(err) {
      devLogger.error(`${err.message} path: ${req.method} ${req.originalUrl}`);
      res.status(500);
      reject("Cannot write in file");
    }
  });
};

module.exports = {
  createFile,
  readFile,
  writeFile,
};
