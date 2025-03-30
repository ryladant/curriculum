import { Player } from "./player.js"
import { Ball } from "./ball.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player1 = new Player(
    canvas, 
    ctx,
    canvas.width - 20, 
    canvas.height/2,
    "p1"
)

let player2 = new Player(
    canvas, 
    ctx, 
    0, 
    canvas.height/2,
    "p2"
)

let ball = new Ball(
    canvas, 
    ctx,
    canvas.width/2, 
    canvas.height/2
)

function start(){
    update()
}

function clear_stage(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function update(){
    clear_stage()
    ball.update(canvas, ctx, [player1, player2])
    player1.update(ctx)
    player2.update(ctx)
    requestAnimationFrame(update)
}

start()
