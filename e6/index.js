const express = require('express');
const fs = require('fs');
const constants = require('./constants/constants');
const router = require('./router/routes');
const fileService = require('./utils/fileService');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/user', router);

app.use('/', (req, res, errr) => {
  console.log('Base');
});

app.listen(port, (req, res, err) => {
  console.log("listening on port ", port);

  if(!fs.existsSync(constants.user_credentials)) {
    fileService.createFile(constants.user_credentials);
  }

})