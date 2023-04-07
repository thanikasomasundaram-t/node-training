const express = require("express");
const app = express();
const { createFile } = require("./utils/fileIO");
const fs = require("fs");
const router = require("./routes/routes");
const constants = require('./constants');
require('dotenv').config();


app.use(express.json());

app.use("/buddies", router);

app.use('/',(req, res) => {
  res.send("Base")
});

app.listen(process.env.PORT, async () => {
  console.log(process.env.PORT + "is connected");
  if (!fs.existsSync(constants.CREATE_FILE_PATH)) {
    try {
      await createFile(constants.CREATE_FILE_PATH);
    }
    catch(err) {
      console.log(err);
    }
  }
});