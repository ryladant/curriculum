export class Ball{
    constructor(canvas, ctx, x, y){
        this.width = 20
        this.height = 20
        this.x = x
        this.y = y - this.width/2
        this.ctx = ctx
        this.speedX = 4
        this.speedY = 4
        this.colision = false

        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    colision_walls(canvas){
        if(this.y > canvas.height - this.width || this.y < 0){
            this.speedY = this.speedY * (-1)
            this.colision = false
        }

        if(this.x < 0 || this.x > canvas.width - this.width){
            this.speedX = this.speedX * (-1)
            this.colision = false
        }

    }

    collision_players(players){
        let player1 = players[0]
        let player2 = players[1]

        if(
            this.x+this.speedX+this.width >= player1.x &&
            this.y + this.width >= player1.y && 
            this.y+this.width <= player1.y+player1.height &&
            !this.colision
        ){
            this.colision = true
            this.speedX *= -1
        }

        if(
            this.x-this.speedX <= player2.x+player2.width &&
            this.y >= player2.y && 
            this.y <= player2.y+player2.height &&
            !this.colision
        ){
            this.colision = true
            this.speedX *= -1
        }
    }

    move(ctx){
        this.x += this.speedX
        this.y += this.speedY
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(canvas, ctx, players){
        this.colision_walls(canvas)
        this.collision_players(players)
        this.move(ctx)
        console.log(this.colision)
    }
}