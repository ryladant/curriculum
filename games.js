const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let game_on = false;

const games = [
    { name: "Missile Force", path: "./missile_force/game.js" },
    { name: "Ping", path: "./ping/game.js" }
];

let selectedGame = null;
let mouseX = 0, mouseY = 0;
let fireParticles = [];

// Função para desenhar fundo estrelado com paralaxe
const starLayers = Array.from({ length: 3 }, (_, i) => ({
    speed: 0.5 + i * 0.5,
    stars: Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1, // Raio base para pulsação
        color: Math.random() < 1 / 40 ? ["red", "blue", "purple"][Math.floor(Math.random() * 3)] : "white",
        opacity: 1,
        vx: 0,
        vy: Math.random() * -2 - 1, // Velocidade inicial simulando transferência
        pulseSpeed: Math.random() * 0.01 + 0.005, // Velocidade do pulsar mais suave
        pulseFactor: Math.random() * 0.3 + 0.85 // Fator de variação mais sutil
    }))
}));

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    starLayers.forEach(layer => {
        layer.stars.forEach(star => {
            star.y += star.vy;
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
                star.vy = Math.random() * -2 - 1;
            }
            star.opacity = 1 - Math.min(1, (star.y / canvas.height) * 1.01);
            
            let pulse = Math.sin(performance.now() * star.pulseSpeed) * star.pulseFactor;
            star.radius = Math.max(0.5, star.baseRadius * (1 + pulse));
            
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.color === "white" ? star.radius : star.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    });
}

function drawFireEffect() {
    fireParticles.forEach((particle, index) => {
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = `rgba(255, ${Math.floor(100 + particle.alpha * 155)}, 0, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        particle.y -= particle.speed;
        particle.alpha -= 0.02;
        particle.size *= 0.97;
        
        if (particle.alpha <= 0) {
            fireParticles.splice(index, 1);
        }
    });
}

function drawMenu() {
    if (!game_on) {
        drawBackground();
        drawFireEffect();

        ctx.fillStyle = "#0f0";
        ctx.font = "bold 20px 'Press Start 2P', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Escolha um dos mini-games", canvas.width / 2, canvas.height / 5);
        ctx.fillText("Ou se preferir,", canvas.width / 2, canvas.height - canvas.height / 5);
        ctx.fillText("apenas role para baixo =)", canvas.width / 2, canvas.height - canvas.height / 5 + 30);

        games.forEach((game, index) => {
            let x = canvas.width / 2 - 100;
            let y = 200 + index * 80;
            let width = 200;
            let height = 50;
            let isHovered = mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
            
            ctx.fillStyle = "#999";
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = "#666";
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, width, height);
            
            ctx.fillStyle = isHovered ? "red" : "black";
            ctx.font = "bold 13px 'Press Start 2P', sans-serif";
            ctx.fillText(game.name, canvas.width / 2, y + 32);
            
            if (isHovered) {
                for (let i = 0; i < 5; i++) {
                    fireParticles.push({
                        x: x + Math.random() * width,
                        y: y,
                        size: Math.random() * 3 + 2,
                        speed: Math.random() * 2 + 1,
                        alpha: 1
                    });
                }
            }
        });

        requestAnimationFrame(drawMenu);
    }
}

canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

canvas.addEventListener("click", (event) => {
    if (selectedGame == null) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        games.forEach((game, index) => {
            let x = canvas.width / 2 - 100;
            let y = 200 + index * 80;
            let width = 200;
            let height = 50;
            if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
                selectedGame = game;
                loadGame(game.path);
                game_on = true;
            }
        });
    }
});

function loadGame(gamePath) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const script = document.createElement("script");
    script.type = "module";
    script.src = gamePath;
    script.onload = () => console.log(`${selectedGame.name} loaded.`);
    document.body.appendChild(script);
}

// Inicia o menu
drawMenu();
