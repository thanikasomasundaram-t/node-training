let http = require('http');
let { readFileSync, writeFileSync } = require('fs');

http.createServer((req, res, err) => {
    let setRandomColors = new Set();
    if (err) {
        res.write(err);
    }
    //read file from file color_palette
    let colors = JSON.parse(readFileSync('./color_palette.json', 'UTF-8'));

    //loop till five random colors are pushed to array randomColors.
    while (setRandomColors.size < 5) {
        let randomNumber = Math.floor(Math.random() * colors.length);
        setRandomColors.add(colors[randomNumber]);
    }
    // write into file
    writeFileSync('./random_colors.json', JSON.stringify(Array.from(setRandomColors)));

    //read from written file
    let getRandomColors = JSON.parse(readFileSync('./random_colors.json'));

    console.log("--------------------RANDOM FIVE COLORS----------------------")
    console.log(getRandomColors);

    res.write(JSON.stringify(getRandomColors));
    res.end();

}).listen(4000);

