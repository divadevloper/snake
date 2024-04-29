const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
let scoreText = document.querySelector("#scoreText");
const resetbtn = document.querySelector("#resetbtn")
const gamewidth = gameboard.width;
const gameheigth = gameboard.height;
const boardbackground = "white";
const snakecolor = "teal";
const snakeboard = "black"
const foodcolor = "red";
const unitsize = 25;
let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    // bodypart of the snake
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener("keydown", changeDirection);
resetbtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    scoreText.innerHTML = score
    createFood();
    drawFood();
    nextTick();
}
function nextTick() {
    if (running) {
        setTimeout(() => {
            ClearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
}
function ClearBoard() {
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheigth);
}
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize
        return randNum;
    }
    foodX = randomFood(0, gamewidth - unitsize)
    foodY = randomFood(0, gamewidth - unitsize)
    console.log(foodX);
}
function drawFood() {
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX, foodY, unitsize, unitsize)
}
function moveSnake() {
    const head = {
        x: snake[0].x + xvelocity,
        y: snake[0].y + yvelocity
    };

    snake.unshift(head);
    // if food eaten
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.innerHTML = score
        createFood();
    } else {
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakecolor
    ctx.strokeStyle = snakeboard
    snake.forEach(snakepart => {
        ctx.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
        ctx.strokeRect(snakepart.x, snakepart.y, unitsize, unitsize);
    })
}
function changeDirection(event) {
    const keypressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yvelocity == -unitsize)
    const goingDown = (yvelocity == unitsize)
    const goingRight = (xvelocity == unitsize)
    const goingLeft = (xvelocity == -unitsize)

    switch (true) {
        case (keypressed == LEFT && !goingRight):
            xvelocity = -unitsize
            yvelocity = 0
            break;
    
        case (keypressed == UP && !goingDown):
            xvelocity = 0
            yvelocity = -unitsize
            break;
    
        case (keypressed == RIGHT && !goingLeft):
            xvelocity = unitsize;
            yvelocity = 0;
            break;

        case (keypressed == DOWN && !goingUP):
            xvelocity = 0;
            yvelocity = unitsize;
            break;
    
        default:
            break;
    }
}
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break;
    
        case (snake[0].x >= gamewidth):
            running = false
            break;
    
        case (snake[0].y < 0):
            running = false
            break;

            case (snake[0].y >= gameheigth):
            running = false
            break;

    }
    for (let i = 1; i < snake.length; i+=1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false
        }
    }
}
function displayGameOver() {
     ctx.font = "50px MV Boli";
     ctx.fillStyle = "black";
     ctx.textAlign = "center";
     ctx.fillText ("Game Over!", gamewidth / 2, gameheigth / 2)
     running = false
}
function resetGame() {
   score = 0;
   xvelocity = unitsize;
   yvelocity = 0;
   snake = [
    // bodypart of the snake
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 }
];
gameStart();

}