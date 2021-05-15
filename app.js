//variables
const mainRange = 69;
const powerballRange = 26;
let winnerArray = new Array();
let winnerPowerBall;

//dom elements 
const playButton = document.querySelector(".play-button");
let week = document.querySelector(".week-span");
let budget = document.querySelector(".budget-span");
const balls = document.querySelectorAll(".ball");
const couponColumns = document.querySelectorAll(".coupon-column");
let couponHeader = document.querySelectorAll(".coupon-header");
let couponBalls = document.querySelectorAll(".coupon-balls");
let couponPowerballs = document.querySelectorAll(".coupon-powerballs");
let playedNums = [[], [], [], [], []];
let playedPowerballs = [[], [], [], [], []];
let ready = new Array();



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
    increaseWeek();
    addPrizes();
}

//check if the all numbers scribble or not 
function checkReadyToPlay() {
    let playedNumLength = 0;
    let playedPowerballLength = 0;
    let readyToPlayTop = false;
    let readyToPlayBottom = false;
    let readyToPlay = [[], [], [], [], []];
    ready = [];
    playedNums.forEach((element, index) => {
        playedNumLength += element.length;
        //if all 5 numbers check, decrease opacity of the column
        if (element.length == 5) {
            couponBalls[index].style.opacity = "0.6";
            readyToPlayTop = true;
            readyToPlay[index].push(readyToPlayTop);
        } else {
            couponBalls[index].style.opacity = "1";
            readyToPlayTop = false;
        }
    })
    playedPowerballs.forEach((element, index) => {
        playedPowerballLength += element.length;
        //if any number check, decrease opacity of the column
        if (element.length == 1) {
            couponPowerballs[index].style.opacity = "0.6";
            readyToPlayBottom = true;
            readyToPlay[index].push(readyToPlayBottom);
        } else {
            couponPowerballs[index].style.opacity = "1";
            readyToPlayTop = false;
        }
    })

    readyToPlay.forEach((el) => {
        if (el[0] == true && el[1] == true) {
            ready.push(true);
        }
    })
    if (ready.includes(true)) {
        activatePlayButton();
    } else {
        deactivatePlayButton();
    }
}

//activate play button
function activatePlayButton() {
    playButton.style.pointerEvents = "auto";
    playButton.style.backgroundColor = "green";
    playButton.style.opacity = "1";
    playButton.style.color = "white";
}

//deactivate play button 
function deactivatePlayButton() {
    playButton.style.pointerEvents = "none";
    playButton.style.opacity = "0.6";
    playButton.style.backgroundColor = "lightgrey"
    playButton.style.color = "black";
}

//give info how many numbers predicted right in each column 
function checkWinner() {
    //check balls
    playedNums.forEach((element, index) => {
        let matches = 0;
        element.forEach((el) => {
            if (winnerArray.includes(el)) {
                matches++;
            }
        });
        couponHeader[index].innerHTML = matches;
    });
    //check powerballs
    playedPowerballs.forEach((element, index) => {
        let matchedPowerball = 0;
        element.forEach((el) => {
            if (winnerPowerBall == el) {
                matchedPowerball++;
            }
        });
        couponHeader[index].innerHTML += " + " + matchedPowerball;
    });
}

//add prizes
function addPrizes() {
    let inPocket;
    couponHeader.forEach((element) => {
        inPocket = Number(budget.innerHTML);
        if (element.innerHTML == "5 + 1") {
            inPocket += 5000000;
        } else if (element.innerHTML == "5 + 0") {
            inPocket += 1000000;
        } else if (element.innerHTML == "4 + 1") {
            inPocket += 50000;
        } else if (element.innerHTML == "4 + 0") {
            inPocket += 100;
        } else if (element.innerHTML == "3 + 1") {
            inPocket += 100;
        } else if (element.innerHTML == "3 + 0") {
            inPocket += 7;
        } else if (element.innerHTML == "2 + 1") {
            inPocket += 7;
        } else if (element.innerHTML == "1 + 1") {
            inPocket += 4;
        } else if (element.innerHTML == "0 + 1") {
            inPocket += 4;
        }
        budget.innerHTML = inPocket;
    });
    let costOfPlay = 2 * ready.length;
    budgetNum = Number(budget.innerHTML);
    budget.innerHTML = budgetNum-costOfPlay;
}

//increase the week display
function increaseWeek() {
    let value = Number(week.innerHTML);
    value += 1
    week.innerHTML = value;
}
