
const express = require('express');
const app = express();
const  { createFile } = require("./services/createFileService");
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const addToListRoute = require('./routes/addToListRoute').router;
const deleteInListRoute = require('./routes/deleteInListRoute').router;
const updateToListRoute = require('./routes/updateToListRoute').router;
const getOneFromListRoute = require('./routes/getOneFromListRoute').router;
const listAllRoute = require('./routes/listAllRoute').router;


app.use(express.json());

app.use(cors());

app.use('/add', addToListRoute);

app.use('/delete', deleteInListRoute);

app.use('/update', updateToListRoute);

app.use('/get', getOneFromListRoute);

app.use('/getAll', listAllRoute);

app.use('/', (req, res) => {
    res.send("Base root");
});

app.listen(process.env.PORT, ()=> {
    console.log(process.env.PORT + 'is connected');
    if(!fs.existsSync('./cdw_ace23_buddies.json')) {
        createFile();
    }
})

