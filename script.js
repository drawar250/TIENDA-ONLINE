// Seleccionamos los elementos del DOM
const gameArea = document.getElementById("gameArea");
const bar = document.getElementById("bar");
const ball = document.getElementById("ball");

// Variables iniciales
let barSpeed = 20;
let ballSpeedX = 4;
let ballSpeedY = 4;
let ballX = 290;
let ballY = 200;
let barX = 250;

// Movimiento de la barra
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && barX > 0) {
        barX -= barSpeed;
    } else if (event.key === "ArrowRight" && barX < gameArea.clientWidth - bar.offsetWidth) {
        barX += barSpeed;
    }
    bar.style.left = `${barX}px`;
});

// Movimiento de la pelota
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en paredes
    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.offsetWidth) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Rebote en la barra
    if (
        ballY + ball.offsetHeight >= bar.offsetTop &&
        ballX + ball.offsetWidth >= barX &&
        ballX <= barX + bar.offsetWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // Fin del juego si la pelota toca el fondo
    if (ballY > gameArea.clientHeight) {
        alert("¡Perdiste! Recarga la página para volver a intentarlo.");
        clearInterval(gameInterval);
    }

    // Actualizamos la posición de la pelota
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Ejecutamos el juego
const gameInterval = setInterval(moveBall, 20);
