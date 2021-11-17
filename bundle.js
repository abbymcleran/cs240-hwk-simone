(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Simone the Memory Game
 */

// references to index.html objects
let background = document.querySelector("body");
let status = document.querySelector("p[id='status']");
let rounds = document.querySelector("input[id='rounds']");

let green = document.querySelector("div[class='green']");
let blue = document.querySelector("div[class='blue']");
let yellow = document.querySelector("div[class='yellow']");
let red = document.querySelector("div[class='red']");

let playButton = document.querySelector("button[id='play']")

// references to sounds that will be used in the game
let greenSound = new Audio("sounds/green.wav");
let blueSound = new Audio("sounds/blue.wav");
let yellowSound = new Audio("sounds/yellow.wav");
let redSound = new Audio("sounds/red.wav");
let winSound = new Audio("sounds/win.mp3");
let loseSound = new Audio("sounds/lose.wav");
let nextRoundSound = new Audio("sounds/nextRound.wav");
let wrongSound = new Audio("sounds/wrong.wav");

// arrays for the game
let gameSequence = [];
let startSequence = [];

// variables to be used while game is played
let currentRound = 1;
let turn = 0;
let roundsInput = 0;

// when this button is pressed, the game starts
playButton.addEventListener("click", async function(){
    roundsInput = rounds.value;

    // event listeners for when colors are pressed
    green.addEventListener("mousedown", function() {
        green.style.backgroundColor = "lightgreen";
    });
    green.addEventListener("mouseup", function(){
        greenSound.play();
        green.style.backgroundColor = "forestgreen";
        checkTurn("G");
    });
    green.addEventListener("mouseover", function() {
        green.style.border = "solid #eeeeee .5px";
    });
    green.addEventListener("mouseout", function(){
        green.style.border = null;
        green.style.backgroundColor = "forestgreen";
    });

    blue.addEventListener("mousedown", function() {
        blue.style.backgroundColor = "lightblue";
    });
    blue.addEventListener("mouseup", function(){
        blueSound.play();
        blue.style.backgroundColor = "#0000bb";
        checkTurn("B");
    });
    blue.addEventListener("mouseover", function() {
        blue.style.border = "solid #eeeeee .5px";
    });
    blue.addEventListener("mouseout", function(){
        blue.style.border = null;
        blue.style.backgroundColor = "#0000bb";
    });

    yellow.addEventListener("mousedown", function() {
        yellow.style.backgroundColor = "yellow";
    });
    yellow.addEventListener("mouseup", function(){
        yellowSound.play();
        yellow.style.backgroundColor = "goldenrod";
        checkTurn("Y");
    });
    yellow.addEventListener("mouseover", function() {
        yellow.style.border = "solid #eeeeee .5px";
    });
    yellow.addEventListener("mouseout", function(){
        yellow.style.border = null;
        yellow.style.backgroundColor = "goldenrod";
    });

    red.addEventListener("mousedown", function() {
        red.style.backgroundColor = "hotpink";
    });
    red.addEventListener("mouseup", function(){
        redSound.play();
        red.style.backgroundColor = "#ff0000";
        checkTurn("R");
    });
    red.addEventListener("mouseover", function() {
        red.style.border = "solid #eeeeee .5px";
    });
    red.addEventListener("mouseout", function(){
        red.style.border = null;
        red.style.backgroundColor = "#ff0000";
    });

    // making calls to api and playing game
    try {
        let requestIntro = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start")
        let requestKey = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${roundsInput}`)
        startSequence = requestIntro.data.sequence;
        console.log(startSequence);
        gameSequence = requestKey.data.key;
        console.log(gameSequence);
        
        // playing the intro
        for (let i=0; i<startSequence.length; i++) {
            let color = startSequence[i];
            playColor(color);
            await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 120)
            );
        }

        // time delay before game starts
        await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 4000)
        );

        // to start the first round
        playRound();
        
    } catch (error) {
        console.log(error);
    }
});

// this function plays sound and changes color of designated color
async function playColor(color) {
    if (color == "G"){
        green.style.backgroundColor = "lightgreen";
        greenSound.play();
        await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 120)
            );
        green.style.backgroundColor = "forestgreen";
    } else if (color == "B"){
        blue.style.backgroundColor = "lightblue";
        blueSound.play();
        await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 120)
            );
        blue.style.backgroundColor = "#0000bb";
    } else if (color == "Y"){
        yellow.style.backgroundColor = "yellow";
        yellowSound.play();
        await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 120)
            );
        yellow.style.backgroundColor = "goldenrod";
    } else if (color == "R"){
        red.style.backgroundColor = "hotpink";
        redSound.play();
        await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 120)
            );
        red.style.backgroundColor = "#ff0000";
    }
}

// function for checking user's selection
function checkTurn(color) {
    turn++;
    if(gameSequence[(turn-1)] != color) {
        wrongSound.play();
        loseGame();
    } else if (turn == roundsInput){
        winGame();
    } else {
        if (turn < currentRound) {
            status.innerHTML = "So far so good! " + (currentRound-turn) + " more to go!";
        }
        if (turn == currentRound) {
            nextRound();
        }
    }
}

// function to be called when user loses the game
function loseGame() {
    background.style.backgroundColor = "hotpink";
    status.innerHTML = "Incorrect! You lose!";
    loseSound.play();
    return;
}

// function to be called when user wins the game
function winGame() {
    background.style.backgroundColor = "DeepSkyBlue";
    status.innerHTML = "Yay you win!"
    winSound.play();
    return;
}

// function for moving on to the next round
async function nextRound() {
    currentRound++;
    turn = 0;
    status.innerHTML = "Good job! Prepare for next round.";
    nextRoundSound.play();
    await new Promise((resolve) => 
            setTimeout(() => {
            resolve();
        }, 800)
    );
    status.innerHTML = "Round " + currentRound + " of " + roundsInput;
    await new Promise((resolve) => 
            setTimeout(() => {
            resolve();
        }, 800)
    );
    playRound();
}

// function for playing the rounds of the game
async function playRound() {
    for (let j=0; j<currentRound; j++) {
        let nextColor = gameSequence[j];
        playColor(nextColor);
        await new Promise((resolve) => 
            setTimeout(() => {
                resolve();
            }, 400)
        );
    }
}

},{}]},{},[1]);
