import { Player } from "./player.js"


export class Ball{
    constructor(canvas, ctx, x, y){
        this.width = 20
        this.height = 20
        this.x = x
        this.y = y - this.width/2
        this.ctx = ctx
        this.speedX = canvas.width/200
        this.speedY = canvas.width/200
        this.collision = false
        this.color = "white"
    }

    collision_walls(canvas, players){
        if(this.y > canvas.height - this.width || this.y < 0){
            this.speedY = this.speedY * (-1)
            this.collision = false
        }

        if(this.x < 0 || this.x > canvas.width - this.width){
            this.speedX = this.speedX * (-1)
            this.collision = false
            if(this.x < 0){
                players[1].score += 1
            }else{
                players[0].score += 1
            }
            this.reset_position()
            console.log(`Player 1: ${players[0].score} | Player 2: ${players[1].score}`)
        }
    }

    reset_position(){
        this.x = this.ctx.canvas.width/2
        this.y = this.ctx.canvas.height/2
        this.speedX = this.speedX * -1
        this.collision = false
    }

    collision_players(players){

        let player1 = players[0]
        let player2 = players[1]

        if(
            this.x+this.speedX+this.width >= player1.x &&
            this.y + this.width >= player1.y && 
            this.y+this.width <= player1.y+player1.height &&
            !this.collision
        ){
            this.collision = true
            this.speedX *= -1
        }

        if(
            this.x-this.speedX <= player2.x+player2.width &&
            this.y >= player2.y && 
            this.y <= player2.y+player2.height &&
            !this.collision
        ){
            this.collision = true
            this.speedX *= -1
        }
    }

    rect(ctx, x, y){
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.width, this.height);
    }

    move(ctx){
        this.x += this.speedX
        this.y += this.speedY
        this.rect(ctx, this.x, this.y)
    }

    update(canvas, ctx, players){
        console.log(this.speedX)
        this.collision_walls(canvas, players)
        this.collision_players(players)
        this.move(ctx)
    }
}