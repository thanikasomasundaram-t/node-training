const express = require("express");
const app = express();
const port = 5000;
const { createFile } = require("./services/fileService");
const fs = require("fs");
const router = require("./routes/routes");
require('dotenv').config();


app.use(express.json());

app.use("/buddies", router);

app.use('/',(req, res) => {
  res.send("Base")
});

app.listen(process.env.PORT, async () => {
  console.log(process.env.PORT + "is connected");
  if (!fs.existsSync(process.env.CREATE_FILE_PATH)) {
    try {
      await createFile();
    }
    catch(err) {
      console.log(err);
    }
  }
});