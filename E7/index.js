const express = require('express');
const fs = require('fs');
const constants = require('./constants');
const router = require('./router/routes');
const fileService = require('./utils/fileIO');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/user', router);

app.use('/', (req, res, errr) => {
  res.send({ root: "Base" })
});

app.listen(port, (req, res, err) => {
  console.log("listening on port ", port);
  if(!fs.existsSync(constants.USER_CREDENTIALS)) {
    fileService.createFile(constants.USER_CREDENTIALS, []);
  }
  if(!fs.existsSync(constants.USER_TASKS)) {
    fileService.createFile(constants.USER_TASKS, {});
  }
})