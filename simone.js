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

// references to sounds that will be used in the game
let greenSound = new Audio("sounds/green.wav");
let blueSound = new Audio("sounds/blue.wav");
let yellowSound = new Audio("sounds/yellow.wav");
let redSound = new Audio("sounds/red.wav");
let winSound = new Audio("sounds/win.mpp3");
let loseSound = new Audio("sounds/lose.wav");
let nextRoundSound = new Audio("sounds/nextRound.wav");
let wrongSound = new Audio("sounds/wrong.wav");

// when play simone button is pressed, it'll read the value and then
    // everything will be unlocked (maybe wrap all functions into this one?)
let playButton = document.querySelector("button[id='play']")
playButton.addEventListener("click", function(){
    roundsInput = rounds.innerHTML;
    // intro sequence plays
    // game starts        
})




// stuff below should only run when game is being played, so figure out a
// way to make that possible (maybe put in gamePlay function)
let green = document.querySelector("div[class='green']");
green.addEventListener("mouseDown", function() {
    // green.style.backgroundColor = lightgreen;
    // glows and makes a noise
});
green.addEventListener("mouseOver", function() {
    // green.style.borderColor = "white";
    // puts a border around the object
});

let blue = document.querySelector("div[class='blue']");
blue.addEventListener("click", function() {
    // glows and makes a noise
});
blue.addEventListener("mouseOver", function() {
    // puts a border around the object
});

let yellow = document.querySelector("div[class='yellow']");
yellow.addEventListener("click", function() {
    // glows and makes a noise
});
yellow.addEventListener("mouseOver", function() {
    // puts a border around the object
});

let red = document.querySelector("div[class='red']");
red.addEventListener("click", function() {
    // glows and makes a noise
});
red.addEventListener("mouseOver", function() {
    // puts a border around the object
});




// arrays for the game
let roundSequence = [];
let guessSequence = [];




// retrieve start sequence from api
// play the noise
// if the sequence refers to one of the squares, make that one glow
function gameIntro(){
    // get sequence from api
    // play sounds and light up boxes accordingly
}


// when user inputs # of rounds, get that value and retrieve a sequence from api
// play the things one at a time (use a while loop so like while sequence still going, play one more)
// have something that compares user selection to actual thing
// output responses accordingly
// make sure there are time delays!!!

// gamePlay function:
// status.innerHTML = "Round " currentRound + " of " + numberOfRounds;
// if (user guesses incorrect){
    // wrongSound.play();
    // loseGame();
// } else
// if (user wins){
    // winGame();
// } else {
    // if (still guesses to go) {
        // status.innerHTML = "So far so good! "+x+" more to go!";
    // }
    // nextRoundSound.play();
// }




// function to be called when user loses the game
function loseGame() {
    body.style.backgroundColor = "hotpink";
    status.innerHTML = "Incorrect! You lose!";
    loseSound.play();
}

// function to be called when user wins the game
function winGame() {
    body.style.backgroundColor = "DeepSkyBlue";
    status.innerHTML = "Yay you win!"
    winSound.play();
}