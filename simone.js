const axios = require("axios");
const fs = require("fs");

// use api to play intro when webpage is loaded up
// make functions that play the corresponding noise and light up when buttons are pressed
// make buttons that light up when hovered over
// have something that reads the sequence from the api
    // calls to apis have to be done asynchronously (use promises)
    // converting what you get from api: JSON.parse(jsonString)


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
let winSound = new Audio("sounds/win.mpp3");
let loseSound = new Audio("sounds/lose.wav");
let nextRoundSound = new Audio("sounds/nextRound.wav");
let wrongSound = new Audio("sounds/wrong.wav");

// arrays for the game (might not be needed)
let gameSequence = [];
let startSequence = [];

// variables to be used while game is played
let currentRound = 1;
let turn = 1;
let roundsInput = 0;

// when this button is pressed, the game starts
playButton.addEventListener("click", async function(){
    roundsInput = rounds.innerHTML;

    // calling the functions that make api requests
    getIntroSequence();
    getGameSequence();

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

    // playing the rounds of the game
    for (let i=0; i<rounds; i++){
        for (let j=0; j<currentRound; j++) {
            let nextColor = gameSequence[j];
            playColor(nextColor);
            await new Promise((resolve) => 
                    setTimeout(() => {
                    resolve();
                }, 400)
            );
        }
        while (turn < currentRound){
            // event listeners for when colors are pressed
            green.addEventListener("mousedown", function() {
                green.style.backgroundColor = "lightgreen";
            });
            green.addEventListener("mouseup", function(){
                greenSound.play();
                guessSequence.push("g");
                green.style.backgroundColor = "forestgreen";
                checkColor(green);
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
                guessSequence.push("b");
                blue.style.backgroundColor = "#0000bb";
                checkColor(blue);
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
                guessSequence.push("y");
                yellow.style.backgroundColor = "goldenrod";
                checkColor(yellow);
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
                guessSequence.push("r");
                red.style.backgroundColor = "#ff0000";
                checkColor(red);
            });
            red.addEventListener("mouseover", function() {
                red.style.border = "solid #eeeeee .5px";
            });
            red.addEventListener("mouseout", function(){
                red.style.border = null;
                red.style.backgroundColor = "#ff0000";
            });
        }

        currentRound++;
        turn = 0;
        status.innerHTML = "Good job! Prepare for next round.";
        nextRoundSound.play();
        await new Promise((resolve) => 
                setTimeout(() => {
                resolve();
            }, 800)
        );
        status.innerHTML = "Round " + currentRound + " of " + rounds;
        await new Promise((resolve) => 
                setTimeout(() => {
                resolve();
            }, 800)
        );
    }
})


// plays sound and changes color of designated color
function playColor(color) {
    if (color = green){
        green.style.backgroundColor = "lightgreen";
        greenSound.play();
        green.style.backgroundColor = "forestgreen";
    } else if (color = blue){
        blue.style.backgroundColor = "lightblue";
        greenSound.play();
        green.style.backgroundColor = "#0000bb";
    } else if (color = yellow){
        green.style.backgroundColor = "yellow";
        greenSound.play();
        green.style.backgroundColor = "goldenrod";
    } else if (color = red){
        blue.style.backgroundColor = "hotpink";
        greenSound.play();
        green.style.backgroundColor = "##ff0000";
    }
}




getIntroSequence();

// retrieve start sequence from api
async function getIntroSequence() {
    try {
        let request = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/start")
        console.log(request.data);
    } catch (error) {
        console.log(error);
    }
}

// retrieve game sequence from api
    // when user inputs # of rounds, get that value and retrieve a sequence from api
    // ^ somehow need to do that
async function getGameSequence() {
    try {
        // let request = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/") (need actual link)
        console.log(request.data);
    } catch (error) {
        console.log(error);
    }
}




// function for checking user's selection
function checkTurn(color) {
    if(gameSequence[(turn-1)] != color) {
        wrongSound.play();
        loseGame();
    } else if (currentRound = rounds){
        winGame();
    } else {
        if (turn < currentRound) {
            status.innerHTML = "So far so good! " + (currentRound-turn) + " more to go!";
        }
    }
}

// function to be called when user loses the game
function loseGame() {
    body.style.backgroundColor = "hotpink";
    status.innerHTML = "Incorrect! You lose!";
    loseSound.play();
    return;
}

// function to be called when user wins the game
function winGame() {
    body.style.backgroundColor = "DeepSkyBlue";
    status.innerHTML = "Yay you win!"
    winSound.play();
    return;
}