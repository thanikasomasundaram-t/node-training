const fs = require('fs');

const createFile = (path, data) => {
  try {
    fs.writeFileSync(path,JSON.stringify(data), 'utf-8');
  }
  catch(err) {
    throw err;
  }
}

const readFile = (path) => {
  const users = fs.readFileSync(path);
  return JSON.parse(users);
}

const writeFile = (path, users) => {
  fs.writeFileSync(path, JSON.stringify(users), 'utf-8');
}

module.exports = {
  createFile,
  readFile,
  writeFile,
}