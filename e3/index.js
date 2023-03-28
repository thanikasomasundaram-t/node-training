let http = require('http');
let fs = require('fs');
let rn = require('random-number');


http.createServer((req, res, err) => {
    let setRandomColors = [];
    if (err) {
        res.write(err);
    }
    let colors = JSON.parse(fs.readFileSync('./color_palette.json'));
    let gen = rn.generator({
        min: 0,
        max: colors.length,
        integer: true, 
    });
    for (count = 0; count < 5; count++) {
        setRandomColors.push(colors[gen()]);
    }

    fs.writeFileSync('./random_colors.json', JSON.stringify(setRandomColors));

    let getRandomColors = JSON.parse(fs.readFileSync('./random_colors.json'));

    console.log("--------------------RANDOM FIVE COLORS----------------------")
    console.log(getRandomColors);

    res.write(JSON.stringify(getRandomColors));
    res.end();
}).listen(4000);

