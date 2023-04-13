const fs = require('fs');

const createFile = (path, data) => {
  try {
    fs.writeFileSync(path,JSON.stringify(data), 'utf-8');
  }
  catch(err) {
    throw {
      name: "FileIOException",
      level: "error",
      message: "file cannot be created",
      status: 500,
    };
  }
}

const readFile = (path) => {
  try {
    const users = fs.readFileSync(path);
    return JSON.parse(users);
  }
  catch(err) {
    throw {
      name: "FileIOException",
      level: "error",
      message: err.message,
      status: 500,
    };
  }
}

const writeFile = (path, users) => {
  fs.writeFileSync(path, JSON.stringify(users), 'utf-8');
}

module.exports = {
  createFile,
  readFile,
  writeFile,
}