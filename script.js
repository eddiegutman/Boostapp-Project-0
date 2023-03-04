let game = new Game(3);

function move(imgID) {
    const imgObj = document.getElementById(imgID);
    const player = game.currentPlayer();
    if (window.getComputedStyle(imgObj).visibility == "hidden" && !game.gameOver) {
        game.saveLastMove(imgID);
        imgObj.src = `./${player}.png`;
        imgObj.style.visibility = "visible";
        game.numOfMoves++;
        if (game.checkWin()) {
            if (game.numOfMoves < game.record) {
                game.record = game.numOfMoves;
            }
            window.setTimeout(function () { alert(`${player} is the winner!`) });
        } else if (game.checkTie()) {
            window.setTimeout(function () { alert(`Tie!`) });
        }
        game.switchPlayer();
    }
}

function newGame() {
    game.newGame();
}

function undo() {
    if (game.history.length > 0 && !game.gameOver) {
        game.loadLastMove();
        game.switchPlayer();
        game.numOfMoves--;
    } else {
        alert("Cannot undo anymore");
    }
}

function highScore() {
    alert(`Best game won with only ${game.record} moves`);
}

function save() {
    if (!game.gameOver) {
        if (!localStorage.getItem("savedGame")) {
            game.saveGame();
            alert("Game saved successfully")
        } else {
            alert("There is already a saved game");
        }
    } else {
        alert("Cannot save a completed game");
    }
}

function load() {
    if (localStorage.getItem("savedGame")) {
        game.loadGame();
        window.localStorage.clear();
    } else {
        alert("No saved game detected");
    }
}

function mode() {
    const mode = +prompt("Enter board dimension");
    const table = document.getElementById("table");
    let counter = 0;

    for (let i = 0; i < game.board.size; i++) {
        document.getElementById(`tr${i}`).remove();
    }
    
    for (let i = 0; i < mode; i++) {
        const tr = document.createElement("tr");
        tr.id = `tr${i}`;

        for (let j = 0; j < mode; j++) {
            const img = document.createElement("img");
            img.id = `img${counter}`;
            img.src = `${counter}`;

            const td = document.createElement("td");
            td.addEventListener("click", function anon() { move(img.id); });

            td.append(img);
            tr.append(td);

            counter++;
        }
        table.append(tr);
    }
    game = new Game(mode);
}