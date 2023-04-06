const express = require('express');
const app = express();
const port = 5000;
const  { createFile } = require("./services/fileService");
const fs = require('fs');
const router = require('./routes/routes');

app.use('/buddies', express.json(), router);

app.listen(port, ()=> {
    console.log(port + 'is connected');
    if(!fs.existsSync('./cdw_ace23_buddies.json')) {
        createFile();
    }
});

