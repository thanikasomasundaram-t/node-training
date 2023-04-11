const service = require('../services/controllerServices');
const logger = require('../utils/logger');
const { readFile, writeFile } = require('../utils/fileIO');
const constants = require('../constants');

//SIGNUP
const signup = async (req, res, err) => {
  try {
    const incomingUser = req.body;
    const users = readFile(constants.USER_CREDENTIALS);
    service.checkUserAlreadyExists(users, incomingUser);
    let newUsers = await service.addUser(users, incomingUser);
    writeFile(constants.USER_CREDENTIALS, newUsers);
    const token = service.generateToken(incomingUser);
    console.log(token);
    res.send({ message: "user successfully added", accessToken: token });
  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

//LOGIN
const login = async (req, res, err) => {
  try {
    const incomingUser = req.body;
    const users = readFile(constants.USER_CREDENTIALS);
    await service.authenticateUser(users, incomingUser);
    res.status(200).send({ message: "user logged in" })
  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

// START CRUD
const addTask = (req, res, err) => {
  try {
    const users = readFile(constants.USER_CREDENTIALS);
    const user = service.getUser(users, req.user);
    let task = req.body;
    task = service.addTimeStamp(task);
    service.validateTask(task);
    const usersTasks = readFile(constants.USER_TASKS);
    const newTasks = service.addTask(usersTasks, user.userName, task);
    writeFile(constants.USER_TASKS, newTasks);
    res.status(201).send({ message: "task added successfully" });
  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

const getAllTasks = (req, res, err) => {
  try {
    const users = readFile(constants.USER_CREDENTIALS);
    const user = service.getUser(users, req.user);
    const usersTasks = readFile(constants.USER_TASKS);
    const allTasks = service.getAllTasks(usersTasks, user.userName);
    res.status(201).send(allTasks);
  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

const getTaskById = (req, res, err) => {
  try {
    const taskId = req.params.id;
    const users = readFile(constants.USER_CREDENTIALS);
    const user = service.getUser(users, req.user);
    const usersTasks = readFile(constants.USER_TASKS);
    const task = service.getTaskById(usersTasks, user.userName, taskId);
    res.status(201).send(task);
  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

const updateTask = (req, res, err) => {
  try {
    const taskId = req.params.id;
    const users = readFile(constants.USER_CREDENTIALS);
    const user = service.getUser(users, req.user);
    let task = req.body;
    task = service.addTimeStamp(task);
    service.validateTask(task);
    const usersTasks = readFile(constants.USER_TASKS);
    const updatedTasks = service.updateTask(usersTasks, user.userName, task, taskId);
    writeFile(constants.USER_TASKS, updatedTasks);
    res.status(201).send({ message: "task updated successfully" });

  }
  catch (err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

const deleteTask = (req, res, err) => {
  try {
    const taskId = req.params.id;
    const users = readFile(constants.USER_CREDENTIALS);
    const user = service.getUser(users, req.user);
    const usersTasks = readFile(constants.USER_TASKS);
    const updatedTasks = service.deleteTaskById(usersTasks, user.userName, taskId);
    writeFile(constants.USER_TASKS, updatedTasks);
    res.status(201).send({ message: "task deleted successfully"});
  }
  catch(err) {
    logger.error(err);
    res.status(err.status).send({ messsage: err.message });
  }
}

//END CRUD

// START FEATURES
const filterTasks = (req, res, err) => {

}

const sortTasks = (req, res, err) => {

}

module.exports = {
  signup,
  login,
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  filterTasks,
  sortTasks,
}