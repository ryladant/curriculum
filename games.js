const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const games = [
    { name: "Missile Force", path: "./missile_force/game.js" },
    { name: "Ping", path: "./ping/game.js" }
];

let selectedGame = null;

function drawMenu() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Hora de jogar ;D", canvas.width / 2, 100);

    games.forEach((game, index) => {
        ctx.fillText(game.name, canvas.width / 2, 200 + index * 50);
    });
}

canvas.addEventListener("click", (event) => {
    if(selectedGame == null){
        const mouseY = event.clientY;

        games.forEach((game, index) => {
            const textY = 200 + index * 50;
            if (mouseY > textY - 20 && mouseY < textY + 10) {
                selectedGame = game;
                loadGame(game.path);
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
