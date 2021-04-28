//variables
const mainRange = 69;
const poweballRange = 26;
let order = 1;
let winnerPowerBall;
let winnerArray = new Array;

//create random number
function createRandomNum(range) {
    let randomNum = Math.ceil(Math.random() * range)
    return randomNum;
}

//create five random numbers for winnerArray
while (order <= 5) {
    let number = createRandomNum(mainRange);
    // add random number to the winner array
    if (!winnerArray.includes(number)) {
        winnerArray.push(number);
        order++;
    }
}

//create winner powerball
winnerPowerBall = createRandomNum(poweballRange);

//sort numbers increasingly
winnerArray.sort(function (a, b) {
    return a - b;
});



console.log(winnerArray);
console.log(winnerPowerBall);

