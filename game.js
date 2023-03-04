class Game {
    constructor(size) {
        this.isCircle = false;
        this.gameOver = false;
        this.board = new Board(size);
        this.history = [];
        this.maxMoves = size * size;
        this.record = this.maxMoves;
        this.numOfMoves = 0;
    }

    currentPlayer() {
        return this.isCircle ? "o" : "x";
    }

    switchPlayer() {
        this.isCircle = !this.isCircle;
    }

    checkWin() {
        if (this.board.checkWin()) {
            this.gameOver = true;
            return true;
        } else {
            return false;
        }
    }

    checkTie() {
        if (!this.gameOver && this.numOfMoves == this.maxMoves) {
            this.gameOver = true;
            return true;
        } else {
            return false;
        }
    }

    newGame() {
        this.board.resetBoard();
        this.isCircle = false;
        this.gameOver = false;
        this.numOfMoves = 0;
    }

    saveLastMove(imgID) {
        this.history.push(`${imgID}`);
    }

    loadLastMove() {
        const imgID = this.history.pop();
        const imgObj = document.getElementById(imgID);
        imgObj.src = `${imgID.slice(3)}`;
        imgObj.style.visibility = "hidden";
    }

    saveGame() {
        let save = "";
        for (let i = 0; i < this.history.length; i++) {
            save += `${this.history[i]},`;
        }
        save = save.slice(0, -1) + ";";
        save += this.board.saveBoardState();
        save += `${this.isCircle ? 1 : 0};${this.record};${this.numOfMoves}`;
        window.localStorage.setItem("savedGame", save);
    }

    loadGame() {
        const saveFile = window.localStorage.getItem("savedGame");
        const data = saveFile.split(";");
        this.numOfMoves = data[4];
        this.record = data[3];
        this.isCircle = +data[2] ? true : false;
        this.board.loadBoardState(data[1]);
        this.history = data[0].split(",");
    }
}