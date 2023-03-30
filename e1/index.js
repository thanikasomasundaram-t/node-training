let fs = require('fs');
let setRandomColors = [];

//read file from file color_palette
let colors = JSON.parse(fs.readFileSync('./color_palette.json', 'UTF-8'));
const randomColors = [];

//loop till five random colors are pushed to array randomColors.
var count = 5;
while(count!=0) {
    let randomNumber = Math.floor(Math.random()*colors.length);
    if(randomColors.indexOf(randomNumber) == -1) {
        console.log(randomNumber);
        setRandomColors.push(colors[randomNumber]);
        randomColors.push(randomNumber);
        count-=1;
    }
    else {
        console.log("copy", randomNumber);
    }
}
//write the randomColors into file random_colors.
fs.writeFileSync('./random_colors.json', JSON.stringify(setRandomColors));

let getRandomColors = JSON.parse(fs.readFileSync('./random_colors.json'));

console.log("--------------------RANDOM FIVE COLORS----------------------")
console.log(setRandomColors);