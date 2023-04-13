const bcrypt = require('bcrypt');
const constants = require('../constants');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

// START SIGNUP
const generateToken = (user) => {
  try {
    const token = jwt.sign({ userName: user.userName }, constants.SECRET_KEY);
    return token;
  }
  catch (err) {
    throw {
      name: "AccessTokenException",
      level: "error",
      message: err.message,
      status: 500,
    }
  }

}

const checkUserAlreadyExists = (users, incomingUser) => {
  if (!users.find((user) => user.userName === incomingUser.userName)) {
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
    const user = users.find((user) => user.userName === incomingUser.userName);
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
    throw {
      name: "AddUserException",
      level: "warn",
      message: "user cannot be added",
      status: 500,
    };
  }
}

const getUser = (users, incomingUser) => {
  const user = users.find((user) => user.userName === incomingUser.userName);
  if (user) {
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
  console.log(task)
  let flag = true;
  if (task.title == undefined || !(/^[a-zA-z]{1,50}$/.test(task.title))) {
    console.log("1")
    flag = false;
  }
  if (task.description == undefined || !(/^[a-zA-z]{1,50}$/.test(task.description))) {
    console.log("2")
    flag = false;
  }
  if (task.priority == undefined || !(/^[0-9]{1,2}$/.test(task.priority))) {
    console.log("3")
    flag = false;
  }
  if (task.dueDate == undefined || !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(task.dueDate))) {
    console.log("4")
    flag = false;
  }

  if (flag) {
    return true;
  }
  throw {
    name: "BadInputException",
    level: "warn",
    message: "validate error",
    status: 400,
  }

}

const addTimeStamp = (task) => {
  if (task.comments !== undefined) {
    date = new Date();
    timeStamp = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    task.comments = task.comments.map((comment) => {
      console.log(timeStamp);
      return {
        ...comment,
        timeStamp,
      }
    })
  }
  console.log(task)
  return task;
}

const addTask = (usersTasks, user, task) => {
  let userTasks = usersTasks[user] || {};
  if (userTasks) {
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
  if (usersTasks[user] && Object.keys(usersTasks[user]).length !== 0) {
    return usersTasks[user];
  }
  return { message: "no tasks to show" };
}

const getTaskById = (usersTasks, user, id) => {
  if (usersTasks[user][id]) {
    return usersTasks[user][id];
  }
  return { message: "task doesnot exists" };
}

const updateTask = (usersTasks, user, task, id) => {
  if (usersTasks[user][id] != undefined) {
    usersTasks[user][id] = task;
    return usersTasks;
  }
  throw {
    name: "BadInputException",
    level: "warn",
    message: "task not found",
    status: 404,
  }
}

const deleteTaskById = (usersTasks, user, id) => {
  if (usersTasks[user][id]) {
    delete usersTasks[user][id];
    return usersTasks;
  }
  throw {
    name: "BadInputException",
    level: "warn",
    message: "task not found",
    status: 404,
  }
}

const filterTasks = (userTasks, queries) => {
  const tasksKey = Object.keys(userTasks);
  let filteredTasks = [];
  const title = queries.title;
  tasksKey.forEach((taskId) => { 
    console.log("fsxc ", queries.dueDate, userTasks[taskId])   
    if ((queries.title == undefined || userTasks[taskId].title === queries.title)
      && (queries.priority == undefined || userTasks[taskId].priority === queries.priority)
      && (queries.dueDate == undefined || userTasks[taskId].dueDate === queries.dueDate)) {

        console.log(" hwuu" , (userTasks[taskId].title == undefined || userTasks[taskId].title === queries.title), (userTasks[taskId].priority == undefined || userTasks[taskId].priority === queries.priority), (userTasks[taskId].dueDate == undefined || userTasks[taskId].dueDate === queries.dueDate), userTasks[taskId] );
      filteredTasks.push(userTasks[taskId]);
    }
  });

  return filteredTasks;
}

const sortTasks = () => {
  const tasksKey = Object.keys(userTasks);
}

const findService = (userTasks, queries) => {
  console.log(queries['type'] !== undefined)
  if (queries['type'] == undefined) {
    throw {
      name: "BadInputException",
      level: "warn",
      message: "type field is not mentioned",
      status: 400,
    }
  }
  const type = queries['type'];
  switch (type) {
    case 'filter':
      const filteredTasks = filterTasks(userTasks, queries);
      if(filteredTasks.length == 0) {
        return { message: "no tasks to show" }
      }
      return filteredTasks;
      break;
    default:
      throw {
        name: "BadInputException",
        level: "warn",
        message: "type is not availabe",
        status: 400,
      }
  }
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
  addTimeStamp,
  getTaskById,
  updateTask,
  deleteTaskById,
  findService,
}