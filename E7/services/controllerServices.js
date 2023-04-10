const bcrypt = require('bcrypt');
const constants = require('../constants');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

// START SIGNUP
const generateToken = (user) => {
  const token = jwt.sign({ username: user.username }, constants.SECRET_KEY);
  return token;
}

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

const getUser = (users, incomingUser) => {
  const user = users.find((user) => user.username === incomingUser.username);
  if(user) {
    return user;
  }
  throw {
    name: "BadInputException",
    level: "warn",
    message: "user not found",
    status: 404,
  }
}

const validateTask = (task) => {
  let flag = true;
  console.log(task.description == undefined || !(/^[a-zA-z]{1,50}$/.test(task.description)));
  if(task.title == undefined || !(/^[a-zA-z]{1,50}$/.test(task.title))) {
    console.log("1234567")
    flag = false;
  }

}

const addTaskId = (task) => {
  return {
    id: Date.now(),
    ...task,
  }
}

const addTask = (usersTasks, user, task) => {
  let userTasks = usersTasks[user] || {};
  if(userTasks) {
    userTasks = {
      ...userTasks,
      [Date.now()]: task,
    };
    usersTasks[user] = userTasks;
    return usersTasks;
  }
  throw {
    name: "BadInputException",
    level: "warn",
    message: "cannot add task",
    status: 404,
  }
}

const getAllTasks = (usersTasks, user) => {
  if(usersTasks[user] && Object.keys(usersTasks[user]).length !== 0) {
    return usersTasks[user];
  }
  return { message: "no tasks to show"};
}

module.exports = {
  addUser,
  checkUserAlreadyExists,
  authenticateUser,
  validateTask,
  addTask,
  generateToken,
  getUser,
  getAllTasks,
  addTaskId,
}