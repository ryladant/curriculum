export class Player {
    constructor(canvas, ctx, x, y, flag) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.height = canvas.height / 5;
        this.width = 20;
        this.x = x;
        this.y = y - this.height / 2;
        this.flag = flag;
        this.speed = canvas.width/200;
        this.score = 0;
        this.keys = {};

        console.log(`Player ${this.flag} created at (${this.x}, ${this.y})`);

        window.addEventListener("keydown", (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key] = false;
        });

        window.addEventListener('resize', resizeCanvas);
    }

    resizeCanvas() {
        if(this.x > this.canvas.width/2) {
            this.x = this.canvas.width - this.width;
        }
    }

    move() {
        if (this.flag === "p1") {
            if (this.keys["u"] || this.keys["U"]) this.y -= this.speed; // Sobe com "I"
            if (this.keys["j"] || this.keys["J"]) this.y += this.speed; // Desce com "K"
        } else if (this.flag === "p2") {
            if (this.keys["w"] || this.keys["W"]) this.y -= this.speed; // Sobe com "W"
            if (this.keys["s"] || this.keys["S"]) this.y += this.speed; // Desce com "S"
        }
        // Limita o movimento do jogador dentro da tela
        this.y = Math.max(0, Math.min(this.canvas.height - this.height, this.y));
    }

    update() {
        this.move();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
