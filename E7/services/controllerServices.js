const bcrypt = require('bcrypt');
const constants = require('../constants');
const logger = require('../utils/logger');

// START SIGNUP
const checkUserAlreadyExists = (users, incomingUser) => {
  if (!users.find((user) => user.username === incomingUser.username)) {
    return true;
  }
  else {
    throw {
      name: "BadInputException",
      level: "warn",
      message: "user already exists",
      status: 400,
    }
  }
}

const authenticateUser = async (users, incomingUser) => {
  try {
    const user = users.find((user) => user.username === incomingUser.username);
    if (user) {
      const passwordCheck = await bcrypt.compare(incomingUser.password, user.password);
      if (passwordCheck) {
        return true;
      }
      else {
        throw {
          name: "BadInputException",
          level: "warn",
          message: "password doesnot match",
          status: 404,
        }
      }

    }
    throw {
      name: "BadInputException",
      level: "warn",
      message: "user not found",
      status: 404,
    }
  }
  catch (err) {
    throw err
  }
}

const addUser = async (users, incomingUser) => {
  try {
    console.log("before");
    const salt = await bcrypt.genSalt(constants.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(incomingUser.password, salt);
    let updateUser = {
      ...incomingUser,
      password: hashedPassword,
    };
    users.push(updateUser);
    return users;
  }
  catch (err) {
    throw err;
  }
}

const validateTask = (task) => {
  return true;
}

const adddTask = (usersTasks, task) => {
  return true;
}

module.exports = {
  addUser,
  checkUserAlreadyExists,
  authenticateUser,
  validateTask,
  adddTask,
}