let fs = require('fs');
let setRandomColors = [];

let colors = JSON.parse(fs.readFileSync('./color_palette.json', 'UTF-8'));

for(count = 0; count < 5; count ++) {
    setRandomColors.push(colors[Math.floor(Math.random()*colors.length)]);
}

fs.writeFileSync('./random_colors.json', JSON.stringify(setRandomColors));

let getRandomColors = JSON.parse(fs.readFileSync('./random_colors.json'));

console.log("--------------------RANDOM FIVE COLORS----------------------")
console.log(getRandomColors);