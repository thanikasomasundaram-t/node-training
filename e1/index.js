let { readFileSync, writeFileSync }= require('fs');
let setRandomColors = new Set();

//read file from file color_palette
let colors = JSON.parse(readFileSync('./color_palette.json', 'UTF-8'));


//loop till five random colors are pushed to array randomColors.
while(setRandomColors.size < 5) {
    let randomNumber = Math.floor(Math.random()*colors.length);
    setRandomColors.add(colors[randomNumber]);
}



writeFileSync('./random_colors.json', JSON.stringify(Array.from(setRandomColors)
));

let getRandomColors = JSON.parse(readFileSync('./random_colors.json'));

console.log("--------------------RANDOM FIVE COLORS----------------------")
console.log(getRandomColors);