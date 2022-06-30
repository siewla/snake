const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 5;
let boxCount = 20;
let boxSize = canvas.width / boxCount;
let headX = 0;
let headY = 0;
let snakeBody = [];

console.log(boxCount)
console.log(boxSize)

//velocity of the snake at the begin

let velocityOfX = 0;
let velocityOfY = 0;

//food Initposition
let foodX = 1;
let foodY = 1;
//set score to be 0 at initialization state.
let score = 0;

let tail = 16;

const hittingSound = new Audio("./soundeffect.wav")

class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawGame() {
    snakeMovement();
    // decide the result of the game	
    let result = isGameOver();
    if (result) {
        hittingSound.play();
        return;
    };
    clearScreen();
    drawSnake();
    drawFood();
    foodEating();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
};

function clearScreen() {
    ctx.fillStyle = "rgb(55,150,125)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    // draw the snake head
    ctx.fillStyle = "red";
    ctx.fillRect(headX * boxSize, headY * boxSize, boxSize, boxSize);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    for (let i = 0; i < snakeBody.length; i++) {
        let body = snakeBody[i];

        ctx.fillRect(body.x * boxSize, body.y * boxSize, boxSize, boxSize);
        ctx.strokeRect(body.x * boxSize, body.y * boxSize, boxSize, boxSize);
    }
    // put the new item to the position of the head
    snakeBody.push(new SnakeBody(headX, headY))

    if (snakeBody.length > tail) {
        snakeBody.shift();
    }
}

document.addEventListener("keydown", directionControl);
// squence of the snake control direction: left:37 right:39 up:38 down:40 
function directionControl(event) {
    switch (event.keyCode) {
        case 37:
            if (velocityOfX == 1) {
                return;
            } else {
                velocityOfX = -1;
                velocityOfY = 0;
            }
            break;
        case 39:
            if (velocityOfX == -1) {
                return;
            } else {
                velocityOfY = 0;
                velocityOfX = 1;
            }
            break;
        case 38:
            if (velocityOfY == 1) {
                return;
            } else {
                velocityOfY = -1;
                velocityOfX = 0;
            }
            break;
        case 40:
            if (velocityOfY == -1) {
                return;
            } else {
                velocityOfY = 1;
                velocityOfX = 0;
            }
            break;
    }
}

function snakeMovement() {
    headX += velocityOfX;
    headY += velocityOfY;
}

function drawFood() {
    ctx.fillStyle = "blue";
    ctx.fillRect(foodX * boxSize, foodY * boxSize, boxSize, boxSize)
}

function foodEating() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * boxCount);
        foodY = Math.floor(Math.random() * boxCount);
        tail++;
        score++;
        hittingSound.play();
    }
}

function drawScore() {
    ctx.fillStyle = "orange";
    ctx.fillStyle = "30px Arial";
    ctx.fillText("score: " + score, canvas.width - 50, 10);
}

function isGameOver() {

    // default that the game should be going on
    let gameOver = false;
    if (velocityOfX === 0 && velocityOfY === 0) {
        return gameOver = false;
    };
    // hit the wall/boundary
    if (headX < 0 || headX >= boxCount || headY < 0 || headY >= boxCount) {
        gameOver = true;
    };


    // hit the its own body also is considered as true
    for (let i = 0; i < snakeBody.length; i++) {
        let body = snakeBody[i];
        if (body.x === headX && body.y === headY) {
            gameOver = true;
            break;
        };
    };
    // Alert the user with message.
    if (gameOver) {
        ctx.fillStyle = "white"
        ctx.font = "50px Arial";
        ctx.fillText("Game Over!", canvas.width / 7, canvas.height / 2);
    };


    return gameOver;
}

drawGame();