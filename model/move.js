import Notation from './notation.js';


export default class Move {
    /**
      * Create a new Move object.
      * board must be the board BEFORE the move has been made.
      */
    constructor(x1, y1, x2, y2, board, promotion=null) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.movedSymbol = board.getSymbol(x1, y1);
        this.targetSymbol = board.getSymbol(x2, y2);
        this.castlingSide = null;

        if (board.isPromotion(x1, y1, x2, y2)) {
            this.promotion = promotion;
        } else {
            this.castlingSide = board.getCastlingSide(
                x1, y1, x2, y2);
        }
        let newBoard = board.copy();
        try {
            newBoard.move(x1, y1, x2, y2, true, promotion);
        } catch (e) {
            throw e;
        }
        this.notation = Notation.getAlgebraic(this, newBoard);
    }

    get start() {
        if (typeof this.x1 === 'undefined' ||
                typeof this.y1 === 'undefined') {
            return undefined;
        }
        return {
            x: this.x1,
            y: this.y1
        };
    }

    get end() {
        if (typeof this.x2 === 'undefined' ||
                typeof this.y2 === 'undefined') {
            return undefined;
        }
        return {
            x: this.x2,
            y: this.y2
        };
    }

    get isCapture() {
        return !!this.targetSymbol;
    }

    get isCastling() {
        return !!this.castlingSide;
    }
}