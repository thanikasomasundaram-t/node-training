const express = require("express");
const router = require("./routes/routes");
const constants = require('./constants');
const { createFile } = require("./utils/fileIO");
const fs = require("fs");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/buddies", router);

app.use('/',(req, res) => {
  res.send("Base")
});

app.listen(port, async () => {
  console.log(port + " is connected");
  if (!fs.existsSync(constants.CREATE_FILE_PATH)) {
    try {
      await createFile(constants.CREATE_FILE_PATH);
    }
    catch(err) {
      console.log(err);
    }
  }
});