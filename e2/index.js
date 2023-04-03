let http = require('http');
let { writeFileSync, write } = require('fs');
let { readFileService } = require('./services/readFileService');
let { writeFileService } = require('./services/writeFileService');
require('dotenv').config();

http.createServer(async (req, res, err) => {
    let setRandomColors = new Set();
    if (err) {
        res.write(err);
    }
    try {
        //read file from file color_palette
        console.log(process.env.SOURCE_FILE_PATH);
        const colors = await readFileService(process.env.SOURCE_FILE_PATH);
        //loop till five random colors are pushed to array randomColors.
        while (setRandomColors.size < 5) {
            let randomNumber = Math.floor(Math.random() * colors.length);
            setRandomColors.add(colors[randomNumber]);
        }

        // write into file
        writeFileService(process.env.DESTINATION_FILE_PATH, setRandomColors);

        const getRandomColors = await readFileService(process.env.DESTINATION_FILE_PATH);

        console.log("--------------------RANDOM FIVE COLORS----------------------")
        console.log(getRandomColors);

        res.write(JSON.stringify(getRandomColors));

    }
    catch (err) {
        res.write(JSON.stringify(err));
    }
    res.end();

}).listen(4000);

