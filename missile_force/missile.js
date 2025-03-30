export class Missile {

    constructor(canvas, ctx){
        this.canvas = canvas
        this.ctx = ctx
        this.missiles = []
        this.pause = false
        this.missileInterval = null
        this.GAP = -2
        this.score = 0
        this.startMissileInterval();
    }

    startMissileInterval() {
        this.missileInterval = setInterval(() => {
            this.create();
        }, 1500);
    }
    
    create() {
        let startX = Math.random() * this.canvas.width;
        let endX = Math.random() * this.canvas.width;
        let startY = this.GAP;
        let endY = this.canvas.height;

        let missile = {
            start_x: startX,
            start_y: startY,
            current_x: startX,
            current_y: startY,
            end_x: endX,
            end_y: endY,
            speed: Math.random() * 2 + 1,
            color: "darkred",
            points: 10,
            progress: 0,
            defeat: false
        };

        this.missiles.push(missile);
    }

    defeat_missile(missile){
        missile.defeat = true;
    }

    give_points_to_player(player, missile){
        player.sum_score(missile.points)
    }

    colision_with_explosion(explosions, player){
        this.missiles.forEach(missile => {
            explosions.forEach(explosion => {
                if (
                    missile.current_x > explosion.x - explosion.radius &&
                    missile.current_x < explosion.x + explosion.radius &&
                    missile.current_y > explosion.y - explosion.radius &&
                    missile.current_y < explosion.y + explosion.radius
                ) {
                    this.defeat_missile(missile)
                    this.give_points_to_player(player, missile)
                }
            });
        });
    }

    create_path(){
        this.missiles.forEach(missile => {
            this.ctx.strokeStyle = missile.color;
            this.ctx.lineWidth = 5;
            missile.progress += missile.speed / 600;
            missile.current_x = missile.start_x + (missile.end_x - missile.start_x) * missile.progress;
            missile.current_y = missile.start_y + (missile.end_y - missile.start_y) * missile.progress;
    
            this.ctx.beginPath();
            this.ctx.moveTo(missile.start_x, missile.start_y);
            this.ctx.lineTo(missile.current_x, missile.current_y);
            this.ctx.stroke();
        });
    }
    
    update(explosions, player) {
        this.create_path();
        this.colision_with_explosion(explosions, player);

        this.missiles.forEach(missile => {
            if (missile.current_y > (this.canvas.height - this.canvas.height / 10)) {
                player.decrease_life()
            }
        });

        this.missiles = this.missiles.filter(missile => missile.current_y < (this.canvas.height - this.canvas.height / 10));
        this.missiles = this.missiles.filter(missile => !missile.defeat);
    }
}
