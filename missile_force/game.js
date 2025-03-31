import { Player } from "./player.js"
import { Missile } from "./missile.js"
import { Explosion } from "./explosion.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let missile = new Missile(canvas, ctx)
let explosion = new Explosion(canvas, ctx)

let player = new Player()

let pause = false;
let game_over = false
let icon = "II";

function lifes(){
    ctx.fillStyle = "white";
    ctx.font = "10px 'Press Start 2P'";
    ctx.textAlign = "top";
    ctx.fillText("LIFE: ", 50, canvas.height - 25);
    for(let i = player.life; i >= 1;i--){
        ctx.fillStyle = "white";
        ctx.fillRect(50+i*25, canvas.height - 37, canvas.height/50, canvas.height/50);
    }
}

function gui() {
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - 50, 20, 20, 20);

    ctx.fillStyle = "black";
    ctx.font = "19px Arial";
    ctx.textAlign = "center";
    ctx.fillText(icon, canvas.width - 40, 37);

    lifes()

}

function start() {

    canvas.addEventListener("click", (event) => {
        if (
            event.clientX > canvas.width - 50 &&
            event.clientX < canvas.width - 30 &&
            event.clientY < 40 &&
            event.clientY > 20
        ) {
            pause = !pause;

            icon = pause ? ">" : "II";
            gui();

        } else {
            explosion.create(event)
        }

        if(game_over){
            player.life = 3
            player.score = 0
            missile.missiles = []
            explosion.explosions = []
            game_over = false
        }
    });

    update();
}

function clear_canvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_ground() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, canvas.height - canvas.height/10, canvas.width, 400);
}

function show_score(){
    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "left";
    ctx.fillText(player.score, 50, 50);
}

function call_game_over(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText(
        "Score: " + player.score,
        canvas.width/2, 
        canvas.height/2 - 45
    );

    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);

    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("TRY AGAIN? PRESS F5", canvas.width/2, canvas.height/2 + 40);
}

function update() {
    if(player.life <= 0){
        console.log("game")
        game_over = true
        call_game_over()
    }
    
    if (!pause && !game_over){
        clear_canvas();
        draw_ground();

        missile.update(explosion.explosions, player);
        explosion.update();

        gui();
        show_score();

        requestAnimationFrame(update);
    }
}

start();
