import { Player } from "./player.js"
import { Ball } from "./ball.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player1 = new Player(
    canvas, 
    ctx,
    canvas.width - 40, 
    canvas.height/2,
    "p1"
)

let player2 = new Player(
    canvas, 
    ctx, 
    20, 
    canvas.height/2,
    "p2"
)

let ball = new Ball(
    canvas, 
    ctx,
    canvas.width/2, 
    canvas.height/2
)

function setupTouchControls() {
    canvas.addEventListener("touchmove", (event) => {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();

        if (event.touches.length > 0) {
            const touch_1 = event.touches[0];
            const y_1 = touch_1.clientY - rect.top;

            // Se o primeiro toque estiver na esquerda, controla o player2
            if (touch_1.clientX < canvas.width / 2) {
                player2.y = y_1 - player2.height / 2;
            }
            // Se o primeiro toque estiver na direita, controla o player1
            else {
                player1.y = y_1 - player1.height / 2;
            }
        }

        if (event.touches.length > 1) {
            const touch_2 = event.touches[1];
            const y_2 = touch_2.clientY - rect.top;

            // Se o segundo toque estiver na esquerda, controla o player2
            if (touch_2.clientX < canvas.width / 2) {
                player2.y = y_2 - player2.height / 2;
            }
            // Se o segundo toque estiver na direita, controla o player1
            else {
                player1.y = y_2 - player1.height / 2;
            }
        }
    });
}

setupTouchControls();

function showControls() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Player 1: Use W and S | Player 2: Use U and J", canvas.width / 2, canvas.height / 2);
}

function startGame() {
    showControls();
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update()
    }, 3000);
}

function score() {
    ctx.fillStyle = "white";
    ctx.font = "50px 'Press Start 2P'";
    ctx.textAlign = "center";

    // Exibe o score do Player 1 no primeiro 1/4 da tela
    ctx.fillText(`${player1.score}`, canvas.width / 4, 100);

    // Exibe o score do Player 2 no terceiro 1/4 da tela
    ctx.fillText(`${player2.score}`, (canvas.width / 4) * 3, 100);
}
function start(){
    startGame()
}

function clear_stage(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function update(){
    clear_stage()
    score()
    player1.update(ctx)
    player2.update(ctx)
    ball.update(canvas, ctx, [player1, player2])
    requestAnimationFrame(update)
}

start()
