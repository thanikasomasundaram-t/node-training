let http = require('http');
let fs = require('fs');


http.createServer((req, res, err) => {
    let setRandomColors = [];
    if (err) {
        res.write(err);
    }
    let colors = JSON.parse(fs.readFileSync('./color_palette.json'));

    for (count = 0; count < 5; count++) {
        setRandomColors.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    fs.writeFileSync('./random_colors.json', JSON.stringify(setRandomColors));

    let getRandomColors = JSON.parse(fs.readFileSync('./random_colors.json'));

    console.log("--------------------RANDOM FIVE COLORS----------------------")
    console.log(getRandomColors);

    res.write(JSON.stringify(getRandomColors));
    res.end();
}).listen(4000);

