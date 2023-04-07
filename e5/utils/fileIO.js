let fs = require("fs");
const devLogger = require("./devLogger");

const createFile = (path) => {
  return new Promise((resolve, reject) => {
   try {
      fs.writeFileSync(path,"[]", "utf-8");
      resolve();
    }
    catch(err) {
      reject({ level: "error", status: 500, message: "File cannot be created"});
    }
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(path);
      resolve(JSON.parse(data));
    }
    catch(err) {
      reject({ level:"error", status: 500, message: "File not found"});
    }
  });
};

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    try {
      if(!fs.existsSync(path)) {
        reject({ status: 500, message: "File doesnot exists" });
        return;
      }
      fs.writeFileSync(path, JSON.stringify(data));
      resolve();
    }
    catch(err) {
      devLogger.error(err);
      reject({ level: "error", status: 500, message: "Cannot write in file" });
    }
  });
};

module.exports = {
  createFile,
  readFile,
  writeFile,
};
