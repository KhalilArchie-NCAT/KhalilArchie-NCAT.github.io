
const canvas = document.createElement("canvas");
document.querySelector(".game-container").appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 200;

let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    velocityY: 0,
    gravity: 0.8,
    jumpPower: -12,
    isJumping: false
};

let obstacles = [];
let score = 0;
let gameInterval;
let lastTime = 0;
let gameOver = false; 

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateDino();
    updateObstacles();
    checkCollisions();
    drawElements();

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        displayGameOver();
    }
}

function updateDino() {
    if (dino.isJumping) {
        dino.velocityY = dino.velocityY + dino.gravity;
        dino.y += dino.velocityY;

        if (dino.y >= 150) {
            dino.y = 150;
            dino.isJumping = false;
            dino.velocityY = 0;
        }
    }
}

function updateObstacles() {
    if (Math.random() < 0.01) {
        obstacles.push({ x: canvas.width, y: 150, width: 20, height: 20 });
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.x -= 4;
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }
    });
}

function drawElements() {
    ctx.fillStyle = "#28a745"; 
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    obstacles.forEach(obstacle => {
        ctx.fillStyle = "#FF6347"; 
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        ) {
            gameOver = true;
        }
    });
}

function displayGameOver() {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.font = "16px Arial";
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 30);
}

function startGame() {
    score = 0;
    obstacles = [];
    dino.y = 150;
    dino.velocityY = 0;
    dino.isJumping = false;

    gameOver = false;
    gameInterval = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
    if (event.key === " " && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = dino.jumpPower;
    }
});

startGame();
