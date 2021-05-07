//variables
const mainRange = 69;
const powerballRange = 26;
let winnerArray = new Array();
let winnerPowerBall;
//dom elements 
const playButton = document.querySelector(".play-button");
const balls = document.querySelectorAll(".ball");
const couponColumns = document.querySelectorAll(".coupon-column");
let couponHeader = document.querySelectorAll(".coupon-header");
let couponBalls = document.querySelectorAll(".coupon-balls");
let couponPowerballs = document.querySelectorAll(".coupon-powerballs");
let playedNums = [[], [], [], [], []];
let playedPowerballs = [[], [], [], [], []];


//creating coupons
for (k = 0; k < 5; k++) {
    //creating one coupon cell's balls section
    for (i = 1; i <= 69; i++) {
        let numDiv = document.createElement("div");
        numDiv.innerText = i;
        numDiv.classList = "ball-cell";
        couponBalls[k].appendChild(numDiv);
    }
    //creating superball section
    for (i = 1; i <= 26; i++) {
        let numDiv = document.createElement("div");
        numDiv.innerText = i;
        numDiv.classList = "powerball-cell";
        couponPowerballs[k].appendChild(numDiv);
    }
}

/***** EVENT LISTENERS *****/

//play button for starting the game
playButton.addEventListener("click", clicked);

//choose all of the ball cells
let numDivs = document.querySelectorAll(".ball-cell");
//choose all of the ball cells
let powerballDivs = document.querySelectorAll(".powerball-cell");

//when click mark/unmark & add/remove to the array for 5 nums
numDivs.forEach((element) => {
    element.addEventListener("click", () => {
        let clickedNum = element.innerHTML;
        let columnNum = parseInt(element.parentElement.parentElement.dataset.num);
        //if clicked, clear the x sign and value of it in the array
        if (clickedNum.includes("X")) {
            //remove x sign
            let xRemovedNum = clickedNum.replace('<span class="x">X</span>', "");
            element.innerHTML = xRemovedNum;
            //remove item from array
            const index = playedNums[columnNum].indexOf(Number(xRemovedNum));
            if (index > -1) {
                playedNums[columnNum].splice(index, 1);
            }
        }
        clickedNum = Number(clickedNum);
        //if it has not clicked before add it to the related array
        if (!playedNums[columnNum].includes(clickedNum) && playedNums[columnNum].length < 5 && Number.isFinite(clickedNum)) {
            element.innerHTML += "<span class='x'>X</span>";
            playedNums[columnNum].push(clickedNum);
        }
        checkReadyToPlay();
    })
});

//when click mark/unmark & add/remove to the array for powerballs
powerballDivs.forEach((element) => {
    element.addEventListener("click", () => {
        let clickedNum = element.innerHTML;
        let columnNum = parseInt(element.parentElement.parentElement.dataset.num);
        if (clickedNum.includes("X")) {
            //remove x sign
            let xRemovedNum = clickedNum.replace('<span class="x">X</span>', "");
            element.innerHTML = xRemovedNum;
            //remove item from array
            const index = playedPowerballs[columnNum].indexOf(Number(xRemovedNum));
            if (index > -1) {
                playedPowerballs[columnNum].splice(index, 1)
            }
        }
        clickedNum = Number(clickedNum);
        //if it has not clicked before add it to the array
        if (!playedPowerballs[columnNum].includes(clickedNum) && playedPowerballs[columnNum].length < 1 && Number.isFinite(clickedNum)) {
            element.innerHTML += "<span class='x'>X</span>";
            playedPowerballs[columnNum].push(clickedNum);
        }
        checkReadyToPlay();
    })
});


/***** FUNCTIONS *****/

//play button clicked
function clicked() {
    let order = 1;
    winnerArray = [];
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

    checkWinner();
}

//check if the all numbers scribble or not 
function checkReadyToPlay() {
    let playedNumLength = 0;
    let playedPowerballLength = 0;
    playedNums.forEach((element, index) => {
        playedNumLength += element.length;
        //if all 5 numbers check, decrease opacity of the column
        if (element.length == 5) {
            couponBalls[index].style.opacity = "0.6";
        } else {
            couponBalls[index].style.opacity = "1";
        }
    })
    playedPowerballs.forEach((element, index) => {
        playedPowerballLength += element.length;
        //if all 5 numbers check, decrease opacity of the column
        if (element.length == 1) {
            couponPowerballs[index].style.opacity = "0.6";
        } else {
            couponPowerballs[index].style.opacity = "1";
        }
    })
    //if all the columns are filled, activate play button
    if (playedNumLength == 25) {
        if (playedPowerballLength == 5) {
            playButton.style.pointerEvents = "auto";
            playButton.style.backgroundColor = "green";
        } else {
            playButton.style.pointerEvents = "none";
            playButton.style.backgroundColor = "grey";
        }
    } else {
        playButton.style.pointerEvents = "none";
        playButton.style.backgroundColor = "grey";
    }
}



function checkWinner() {
    playedNums.forEach((element, index) => {
        let matches = 0;
        element.forEach((el) => {
            if (winnerArray.includes(el)) {
                matches++;
            }
        });
        couponHeader[index].innerHTML = matches;
    });

}