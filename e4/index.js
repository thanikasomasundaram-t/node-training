const express = require('express');
const app = express();
const port = 5000;
const  { createFile } = require("./services/createFileService");
const fs = require('fs');
const router = require('./routes/routes');

app.use(express.json());

app.use('/add', router);

app.use('/delete', router);

app.use('/update', router);

app.use('/get', router);

app.use('/getAll', router);

app.use('/', (req, res, next) => {
    res.send("Base root");
});

app.listen(port, ()=> {
    console.log(port + 'is connected');
    if(!fs.existsSync('./cdw_ace23_buddies.json')) {
        createFile();
    }
});

