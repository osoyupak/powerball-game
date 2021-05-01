//variables
const mainRange = 69;
const powerballRange = 26;
let winnerPowerBall;

//dom elements 
const playButton = document.querySelector(".play-button");
const balls = document.querySelectorAll(".ball");

//event listeners
playButton.addEventListener("click", clicked);

/***** FUNCTIONS *****/

//play button clicked
function clicked() {
    let order = 1;
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
    winnerPowerBall = createRandomNum(powerballRange);

    //sort numbers increasingly
    winnerArray.sort(function (a, b) {
        return a - b;
    });

    //assigning winner numbers to balls
    balls.forEach((ball, index) => {
        setTimeout(() => { }, 3000);
        ball.innerHTML = winnerArray[index];
    })
    balls[5].innerHTML = winnerPowerBall;

    console.log(winnerArray);
    console.log(winnerPowerBall);
}




