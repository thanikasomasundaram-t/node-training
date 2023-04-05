let fs = require("fs");

const createFile = (path) => {
  return new Promise((resolve, reject) => {
   try {
      fs.writeFileSync(path,"[]", "utf-8");
      resolve();
    }
    catch(err) {
      // console.log("file not read error", err);
      reject("File cannot be created");
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
      // console.log();
      reject("File not Found")
    }
  });
};

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data));
      resolve();
    }
    catch(err) {
      // console.log(err);
      reject("Cannot write in file");
    }
  });
};

module.exports = {
  createFile,
  readFile,
  writeFile,
};
