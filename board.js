class Board {
    constructor(size) {
        const table = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(document.getElementById(`img${i * size + j}`));
            }
            table.push(row);
        }

        this.size = size;
        this.table = table;
    }

    checkRow(n) {
        let flag = true;
        for (let i = 0; i < this.size - 1; i++) {
            if (this.table[n][i].src != this.table[n][i + 1].src) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    checkCol(n) {
        let flag = true;
        for (let i = 0; i < this.size - 1; i++) {
            if (this.table[i][n].src != this.table[i + 1][n].src) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    checkDiag1() {
        let flag = true;
        for (let i = 0; i < this.size - 1; i++) {
            if (this.table[i][i].src != this.table[i + 1][i + 1].src) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    checkDiag2() {
        let flag = true;
        for (let i = 0; i < this.size - 1; i++) {
            if (this.table[i][this.size - (i + 1)].src != this.table[i + 1][this.size - (i + 2)].src) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    checkWin() {
        if (this.checkDiag1()) {
            return true;
        } else if (this.checkDiag2()) {
            return true;
        }
        for (let i = 0; i < this.size; i++) {
            if (this.checkRow(i)) {
                return true;
            } else if (this.checkCol(i)) {
                return true;
            }
        }
        return false;
    }

    resetBoard() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.table[i][j].src = `${i * this.size + j}`;
                this.table[i][j].style.visibility = "hidden";
            }
        }
    }

    saveBoardState() {
        let str = "";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const location = this.table[i][j].src;
                str += `${location.substring(location.lastIndexOf("/") + 1)},`;
            }
        }
        str = str.slice(0, -1) + ";";
        return str;
    }

    loadBoardState(state) {
        const arr = state.split(`,`);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (arr[(i * this.size) + j] == "x.png" || arr[(i * this.size) + j] == "o.png") {
                    this.table[i][j].style.visibility = "visible";
                } else {
                    this.table[i][j].style.visibility = "hidden";
                }
                this.table[i][j].src = `./${arr[(i * this.size) + j]}`;
            }
        }
    }
}