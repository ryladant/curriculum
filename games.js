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

function drawMenu() {
    if(!game_on){
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";

        ctx.fillText("Escolha um dos mini-games", canvas.width / 2, canvas.height/5);

        ctx.fillText("Ou se preferir,", canvas.width / 2, canvas.height - canvas.height/5);
        ctx.fillText("apenas role para baixo =)", canvas.width / 2, canvas.height - canvas.height/5 + 30);

        games.forEach((game, index) => {
            ctx.fillText(game.name, canvas.width / 2, 200 + index * 50);
        });

        requestAnimationFrame(drawMenu)
    }
}

canvas.addEventListener("click", (event) => {
    if(selectedGame == null){
        const mouseY = event.clientY;

        games.forEach((game, index) => {
            const textY = 200 + index * 50;
            if (mouseY > textY - 20 && mouseY < textY + 10) {
                selectedGame = game;
                loadGame(game.path);
                game_on = true
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
