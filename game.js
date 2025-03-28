const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let circles = [];
let missiles = [];
let pause = false;
let missileInterval = null;
let score = 0
let lifes = 3
let game_over = false

let icon = "II";
function gui() {
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - 50, 20, 20, 20);

    ctx.fillStyle = "black";
    ctx.font = "19px Arial";
    ctx.textAlign = "center";
    ctx.fillText(icon, canvas.width - 40, 37);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

function start() {
    let max_shots = 3;

    canvas.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

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

            if (pause) {
                clearInterval(missileInterval);
                missileInterval = null;
            } else {
                startMissileInterval();
                update();
            }
        } else {
            if (!pause && !game_over) {
                console.log(circles.length )
                if (circles.length < max_shots) {
                    let explosion = {
                        x: event.clientX,
                        y: event.clientY,
                        radius: 7,
                        color: "yellow"
                    };
                    circles.push(explosion);
                }
            }
        }

        if(game_over){
            lifes = 3
            missiles = []
            circles = []
            score = 0
            game_over = false
        }
    });

    startMissileInterval();
    update();
}


function startMissileInterval() {
    if (!missileInterval) {
        missileInterval = setInterval(createMissile, 1500);
    }
}

function createMissile() {
    if (pause) return;

    let startX = Math.random() * canvas.width;
    let endX = Math.random() * canvas.width;
    let startY = -2;
    let endY = canvas.height;

    let missile = {
        start_x: startX,
        start_y: startY,
        current_x: startX,
        current_y: startY,
        end_x: endX,
        end_y: endY,
        speed: Math.random() * 2 + 1,
        progress: 0,
        defeat: false
    };
    missiles.push(missile);
}

let hue = 0;
function update_missiles() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    missiles.forEach(missile => {
        missile.progress += missile.speed / 600;
        missile.current_x = missile.start_x + (missile.end_x - missile.start_x) * missile.progress;
        missile.current_y = missile.start_y + (missile.end_y - missile.start_y) * missile.progress;

        ctx.beginPath();
        ctx.moveTo(missile.start_x, missile.start_y);
        ctx.lineTo(missile.current_x, missile.current_y);
        ctx.stroke();
    });

    missiles.forEach(missile => {
        circles.forEach(circle => {
            if (
                missile.current_x < circle.x && missile.current_x > circle.x - circle.radius &&
                missile.current_y > circle.y - circle.radius && missile.current_y < circle.y + circle.radius
            ) {
                missile.defeat = true;
                score += 10
            }

            if (
                missile.current_x > circle.x && missile.current_x < circle.x + circle.radius &&
                missile.current_y < circle.y + circle.radius && missile.current_y > circle.y - circle.radius
            ) {
                missile.defeat = true;
                score+=10
            }
        });
    });

    missiles.forEach(missile => {
        if(missile.current_y > canvas.height - 100){
            lifes -= 1
            console.log(lifes)
        }
    })

    missiles = missiles.filter(missile => missile.current_y < canvas.height - 100);
    missiles = missiles.filter(missile => missile.defeat === false);
}

function clear_canvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_ground() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 400);
}

function update_circles() {
    ctx.fillStyle = "yellow";

    if (circles.length > 0) {
        for (let ex of circles) {
            if (ex.radius <= 25)
                ex.radius += 0.2;
            else
                circles.shift();
        }
    }

    for (let circle of circles) {
        hue += 1;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function show_score(){
    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "left";
    ctx.fillText(score, 50, 50);
}

function call_game_over(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("Score: "+score, canvas.width/2, canvas.height/2 - 45);

    ctx.fillStyle = "white";
    ctx.font = "35px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);

    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("TRY AGAIN?", canvas.width/2, canvas.height/2 + 40);
}

function update() {
    if(game_over){
        call_game_over()
        
    }else if (!pause) {
        clear_canvas();
        draw_ground();
        update_missiles();
        update_circles();
        gui();
        show_score();

        if (lifes<=0)
            game_over = true

        requestAnimationFrame(update);
    }
}

start();
