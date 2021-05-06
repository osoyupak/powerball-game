//variables
const mainRange = 69;
const powerballRange = 26;
let winnerPowerBall;

//dom elements 
const playButton = document.querySelector(".play-button");
const balls = document.querySelectorAll(".ball");
const couponColumns = document.querySelectorAll(".coupon-column");
let couponBalls = document.querySelectorAll(".coupon-balls");
let couponPowerballs = document.querySelectorAll(".coupon-powerballs");
let playedNums = [[],[],[],[],[]];
let playedPowerballs = [[],[],[],[],[]];




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
    for (i=1; i<=26; i++) {
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

//when click mark/unmark & add/remove to the array
numDivs.forEach((element)=>{
    element.addEventListener("click", ()=>{
        let clickedNum = element.innerHTML;
        let columnNum = parseInt(element.parentElement.parentElement.dataset.num);
        //if clicked, clear the x sign and value of it in the array
        if(clickedNum.includes("X")) {
            //remove x sign
            let xRemovedNum = clickedNum.replace('<span class="x">X</span>', "");
            element.innerHTML = xRemovedNum;
            //remove item from array
            const index = playedNums[columnNum].indexOf(Number (xRemovedNum));
            if (index > -1) {
                playedNums[columnNum].splice(index, 1);
              }
        }
        clickedNum = Number(clickedNum); 
        //if it has not clicked before add it to the related array
        if(!playedNums[columnNum].includes(clickedNum) && playedNums[columnNum].length<5 && Number.isFinite(clickedNum)) {
            element.innerHTML+="<span class='x'>X</span>";
            playedNums[columnNum].push(clickedNum);
        }
        console.log(playedNums);
    })
});

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




