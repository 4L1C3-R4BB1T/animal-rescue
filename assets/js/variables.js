/*--------------- sounds ---------------*/
let shotSound = document.getElementById("shot");
let meow = document.getElementById("meow");
let bgMusic = document.getElementById("bgMusic");
let rescueSound = document.getElementById("rescue");
let gameoverMusic = document.getElementById("gameover");
let collisionSound = document.getElementById("collision");
let turnHappySound = document.getElementById("turnHappy");

bgMusic.volume -= .7;
gameoverMusic.volume -= .7;
rescueSound.volume -= .7;

/*--------------- variables ---------------*/
let game = {};

game.pressed = [];
    
let canShot = true;

let birdVelocity = 5;
let frogVelocity = 3;
let catVelocity = 1;

let score = 0;
let rescues = 0;
let losts = 0;
let hearts = 5;

const KEY = { W: 87, S: 83, D: 68 }

// random value to bird Y position 
let birdY = parseInt(Math.random() * 300) + 30;

/*--------------- reset default value ---------------*/
function resetVariables() {    
    canShot = true;

    birdVelocity = 5;
    frogVelocity = 3;
    catVelocity = 1;

    score = 0;
    rescues = 0;
    losts = 0;
    hearts = 5;
}
