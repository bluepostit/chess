import {
    Board
} from "./board";
import Move from "./move";

class Game {
    constructor(board = null) {
        this.history = [{
            board: board,
            move: null,
            mate: null
        }];
        this._index = 0;
    }

    getBoard(index) {
        return this.history[index].board;
    }

    get currentBoard() {
        return this.history[this._index].board;
    }

    loadBoard(board) {
        this.history = [{
            board,
            move: null
        }];
        this._index = 0;
        return this;
    }

    set index(index) {
        if (index < 0 || index > (this.history.length - 1)) {
            throw new Error("Invalid game index");
        }
        this._index = index;
    }

    get index() {
        return this._index;
    }

    get length() {
        return this.history.length;
    }

    move(x1, y1, x2, y2, disregardCheck = false, promotion = null) {
        console.time('game.move');
        let board = this.currentBoard.copy();
        let move = new Move(x1, y1, x2, y2, board, promotion);
        board.move(x1, y1, x2, y2, disregardCheck, promotion);
        this.history = this.history.slice(0, this._index + 1);
        this.history.push({
            board,
            move
        })
        this._index += 1;
        console.timeEnd('game.move');
    }
}

export default Game;