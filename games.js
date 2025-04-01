const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do canvas para a tela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawMenu();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let game_on = false;
const games = [
    { name: "Missile Force", path: "./missile_force/game.js" },
    { name: "Ping", path: "./ping/game.js" }
];
let selectedGame = null;

function drawMenu() {
    if (!game_on) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fundo gradiente dinâmico
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#1e3c72");
        gradient.addColorStop(1, "#2a5298");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = `${Math.max(canvas.width * 0.03, 20)}px Arial`;
        ctx.textAlign = "center";

        ctx.fillText("Escolha um dos mini-games", canvas.width / 2, canvas.height * 0.2);
        ctx.fillText("Ou apenas role para baixo =)", canvas.width / 2, canvas.height * 0.8);

        games.forEach((game, index) => {
            let buttonY = canvas.height * 0.35 + index * (canvas.height * 0.1);
            let buttonWidth = canvas.width * 0.4;
            let buttonHeight = canvas.height * 0.08;
            let buttonX = (canvas.width - buttonWidth) / 2;

            // Botão
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

            // Texto do botão
            ctx.fillStyle = "black";
            ctx.fillText(game.name, canvas.width / 2, buttonY + buttonHeight / 2 + 5);
        });
        requestAnimationFrame(drawMenu);
    }
}

canvas.addEventListener("click", (event) => {
    if (selectedGame == null) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        games.forEach((game, index) => {
            let buttonY = canvas.height * 0.35 + index * (canvas.height * 0.1);
            let buttonWidth = canvas.width * 0.4;
            let buttonHeight = canvas.height * 0.08;
            let buttonX = (canvas.width - buttonWidth) / 2;

            if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
                mouseY > buttonY && mouseY < buttonY + buttonHeight) {
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

drawMenu();