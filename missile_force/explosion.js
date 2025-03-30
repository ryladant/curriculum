export class Explosion{

    constructor(canvas, ctx){
        this.canvas = canvas
        this.ctx = ctx
        this.max_explosions = 3
        this.explosions = []
        this.color = "yellow"
        this.radius = 7
        this.pause = false
        this.game_over = false
    }

    create(event){
        if (!this.pause && !this.game_over) {
            if (this.explosions.length < this.max_explosions) {
                let explosion = {
                    x: event.clientX,
                    y: event.clientY,
                    radius: this.radius,
                    color: this.color
                };
                this.explosions.push(explosion);
            }
        }
    }

    update(){
        this.ctx.fillStyle = "yellow";

        if (this.explosions.length > 0) {
            for (let explosion of this.explosions) {
                explosion.radius += 0.2;
                if (explosion.radius >= 20)
                    this.explosions.shift();
            }
        }
    
        for (let explosion of this.explosions) {
            this.ctx.fillStyle = explosion.color
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

    }

}