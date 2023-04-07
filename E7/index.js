const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();


app.use(express.json())

app.use('/', (req, res, err) => {
  res.send("Base root");
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT + ' is connected');
})