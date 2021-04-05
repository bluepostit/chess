import * as Util from './util.js';


function resultsInCheck(x1, y1, x2, y2, board) {
  let piece = board.get(x1, y1);
  let color = piece.color;
  let newBoard = board.copy();
  newBoard.board[x1][y1] = '';
  newBoard.board[x2][y2] = piece.symbol;
  newBoard.colorToMove = Util.getOppositeColor(color);
  return newBoard.isInCheck(color);
}

function isThreatened(x, y, board, disregardCheck=true) {
  let bc = board.copy();
  let piece = bc.get(x, y);
  if (!piece) {
    return false;
  }
  let oppColor = Util.getOppositeColor(piece.color);
  bc.colorToMove = oppColor;
  let oppPieces = bc.getPieces(oppColor);
  let threats = [];
  oppPieces.forEach(oppPiece => {
    if (bc.isValidMove(oppPiece.x, oppPiece.y,
      x, y, disregardCheck)) {
      threats.push(oppPiece);
  }
});
  return threats;
}

function getValidMoves(board, piece) {
  let moves = [];
  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x < 8; x++) {
      let newBoard = board.copy().setPostMoveChecking(false);
      newBoard.colorToMove = piece.color;

      try {
        newBoard.move(piece.x, piece.y, x, y);
        moves.push([x, y]);
      } catch (e) {
        // do nothing
      }
    }
  }
  return moves;
}

export default class Board {
  constructor() {
    let board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = '';
      }
    }
    this.board = board;
    this.hasMoved = {
      white: {
        qr: false,
        k: false,
        kr: false,
      },
      black: {
        qr: false,
        k: false,
        kr: false
      }
    };
    this.state = {
      check: {
        white: null,
        black: null
      },
      checkmate: {
        white: null,
        black: null
      }
    };
    this.postMoveChecking = true;

    this.listeners = {
      'beforeMove': [],
      'afterMove': [],
      'beforeCapture': [],
      'afterCapture': [],
      'gameStart': [],
      'gameEnd': [],
      'check': [],
      'checkmate': []
    };
  }

  setup() {
    this.board = [
    ['wr', 'wp', '', '', '', '', 'bp', 'br'],
    ['wn', 'wp', '', '', '', '', 'bp', 'bn'],
    ['wb', 'wp', '', '', '', '', 'bp', 'bb'],
    ['wq', 'wp', '', '', '', '', 'bp', 'bq'],
    ['wk', 'wp', '', '', '', '', 'bp', 'bk'],
    ['wb', 'wp', '', '', '', '', 'bp', 'bb'],
    ['wn', 'wp', '', '', '', '', 'bp', 'bn'],
    ['wr', 'wp', '', '', '', '', 'bp', 'br'],
    ];
    this.colorToMove = 'white';
    this.state = {
      check: {
        white: false,
        black: false
      },
      checkmate: {
        white: false,
        black: false
      },
    };
    return this;
  }

  setPostMoveChecking(flag) {
    this.postMoveChecking = !!flag;
    return this;
  }

  get(x, y) {
    let symbol = this.board[x][y];
    let piece = Util.getPieceFromSymbol(symbol, x, y);
    return piece;
  }

  getSymbol(x, y) {
    return this.board[x][y];
  }

 /**
  * Finds the given piece on the board.
  */
  findPiece(symbol, firstOnly=false) {
    let foundPieces = [];
    for(let y = 7; y >= 0; y--) {
      for (let x = 0; x < 8; x++) {
        let boardSymbol = this.getSymbol(x, y);
        if (symbol === boardSymbol) {
          let foundPiece = this.get(x, y);
          if (firstOnly) {
            return foundPiece;
          }
          foundPieces.push(foundPiece);
        }
      }
    }
    if (firstOnly && foundPieces.length < 1) {
      return null;
    }
    return foundPieces;
  }

  getPieces(color) {
    let pieces = [];
    for(let y = 7; y >= 0; y--) {
      for (let x = 0; x < 8; x++) {
        let piece = this.get(x, y);
        if (!piece) {
          continue;
        }
        if (piece.color === color) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  isPathClear(x1, y1, x2, y2) {
    let path = Util.getPath(x1, y1, x2, y2);
    for (let pos of path) {
      if(this.getSymbol(...pos) !== "") {
        return false;
      }
    }
    return true;
  }

  getCastlingSide(x1, y1, x2, y2) {
    let piece = this.getSymbol(x1, y1);
    let rookX = null;
    // Not moving in a straight line
    if (x1 !== 4 || (y1 !== y2)) {
      return null;
    }
    if (piece === 'wk' && y1 !== 0) {
      return null;
    }
    if (piece === 'bk' && y1 !== 7) {
      return null;
    }
    // Which x are we moving to?
    if (x2 === 2) {
      rookX = 0;
    } else if (x2 === 6) {
      rookX = 7;
    } else {
      return null;
    }
    // check for rook
    let rook = this.get(rookX, y1);
    if (!rook || (rook.name !== 'Rook')) {
      return null;
    }
    // check for empty paths
    if (!this.isPathClear(x1, y1, rookX, y2)) {
      return null;
    }
    return (rookX === 0 ? 'q' : 'k');
  }

  canCastle(color, side) {
    let can = true;
    let x1 = 4;
    let y = (color === 'white' ? 0 : 7);
    let intermediateX = (side === 'k' ? x1 + 1 : x1 - 1);

    // Would the king be in check at the first square
    // between the king and the rook?
    let board = this.copy();
    if (!board.isValidMove(x1, y, intermediateX, y)) {
      can = false;
    }
    // Have the pieces been moved before?
    if (this.hasMoved[color].k ||
      this.hasMoved[color][side + 'r']) {
      can = false;
    }
    return can;
  }

  move(x1, y1, x2, y2, disregardCheck=false, promotion=null) {
  	let piece = this.get(x1, y1);
    let targetPiece = this.get(x2, y2);
    let pieceName = piece.name;
    let capturing = (targetPiece != null) &&
    (targetPiece.color !== piece.color);
    let promoting = this.isPromotion(x1, y1, x2, y2);
    if (!piece) {
      throw new Error(`No piece found at (${x1}, ${y1})`);
    }
    if (piece.color !== this.colorToMove) {
      throw new Error(`It is not ${piece.color}'s turn to move`);
    }
    // Ensure both positions are on the board
    for (let coord of [x1, y1, x2, y2]) {
      if (coord < 0 || coord > 7) {
        throw new Error('This move is not on the board');
      }
    }
    // Castling
    let castlingSide = null;
    if (pieceName === 'King') {
      castlingSide = this.getCastlingSide(x1, y1, x2, y2);
    }
    if (castlingSide) {
      if (this.isInCheck(this.colorToMove)) {
        throw new Error("Can't castle out of check");
      }
      if (!this.canCastle(this.colorToMove, castlingSide)) {
        throw new Error("Can't castle on this side");
      }
    } else {
    	if (!piece.isValidMove(x2, y2, capturing)) {
        throw new Error(`${pieceName} can't move there`);
      }
        // can't jump over pieces, and this move is more than one square away
        if (!piece.getCanJump() && Util.getIsJump(x1, y1, x2, y2)) {
    		// Check path for pieces
    		if (!this.isPathClear(x1, y1, x2, y2)) {
          throw new Error(`${pieceName} can't move there - obstruction`);
        }
      }
    }
    if (targetPiece != null && targetPiece.color === piece.color) {
      throw new Error("Attempting to capture your own piece");
    }
    if (!disregardCheck && resultsInCheck(x1, y1, x2, y2, this)) {
      throw new Error("Move can't result in check");
    }
    // Pawn promotion
    if (promoting && (promotion != null)) {
      piece = Util.getPieceFromSymbol(
        piece.color[0].toLowerCase() + promotion, x2, y2);
    }

    let event = {
      start: {x: x1, y: y1},
      end: {x: x2, y: y2}
    };
    this.fireEvent('beforeMove', event);
    if (capturing) {
      this.fireEvent('beforeCapture', event);
    }
    this.board[x1][y1] = '';
    this.board[x2][y2] = piece.symbol;

    // Record piece moves for future castling
    if (piece.name === 'King') {
      this.hasMoved[piece.color].k = true;
      if (castlingSide) {
        this.hasMoved[piece.color][castlingSide + 'r'] = true;
      }
    } else if (piece.name === 'Rook') {
      let homeRow = (piece.color === 'white' ? 0 : 7);
      let queenSide = (x1 === 0 && y1 === homeRow);
      let kingSide = (x1 === 7 && y1 === homeRow);
      if (queenSide) {
        this.hasMoved[piece.color].qr = true;
      } else if (kingSide) {
        this.hasMoved[piece.color].kr = true;
      }
    }

    if (castlingSide === 'k') {
      this.board[7][y1] = '';
      this.board[5][y1] = piece.symbol[0] + 'r';
    } else if (castlingSide === 'q') {
      this.board[0][y1] = '';
      this.board[3][y1] = piece.symbol[0] + 'r';
    }

    let oppColor = Util.getOppositeColor(piece.color);
    this.colorToMove = oppColor;

    if (this.postMoveChecking) {
      // Handle state for check and checkmate
      this.setCheckAndCheckmateState();
    }

    if (capturing) {
      this.fireEvent('afterCapture', event);
    }
    this.fireEvent('afterMove', event);
    return this;
  }

  isValidMove(x1, y1, x2, y2, disregardCheck=false) {
    let bc = this.copy().setPostMoveChecking(false);
    try {
      bc.move(x1, y1, x2, y2, disregardCheck);
      return true;
    } catch(e) {
      return false;
    }
  }

  getPossibleMoves(x, y, all=true) {
    let possibles = [];
    outer:
    for (let myY = 7; myY >= 0; myY--) {
      for (let myX = 0; myX < 8; myX++) {
        if (this.isValidMove(x, y, myX, myY)) {
          possibles.push([myX, myY]);
          if (!all) {
            break outer;
          }
        }
      }
    }
    return possibles;
  }

  getThreats(x, y, disregardCheck=true) {
    let pieces = isThreatened(x, y, this, disregardCheck);
    let threats = [];
    if (pieces) {
      for (let piece of pieces) {
        threats.push([piece.x, piece.y]);
      }
    }
    return threats;
  }

  getMoveThreats(x, y) {
    let moves = this.getPossibleMoves(x, y);
    let threats = [];
    for (let move of moves) {
      let [x2, y2] = move;
      let bc = this.copy().setPostMoveChecking(false);
      bc.move(x, y, x2, y2, true);
      let moveThreats = bc.getThreats(x2, y2, false);
      if (moveThreats.length > 0) {
        threats.push([x2, y2]);
      }
    }
    return threats;
  }

  getPossiblePieces() {
    let pieces = this.getPieces(this.colorToMove);
    let possibles = [];
    for (let piece of pieces) {
      if (this.getPossibleMoves(
        piece.x, piece.y, false).length > 0) {
        possibles.push(piece);
      }
    }
    return possibles;
  }

  setCheckAndCheckmateState() {
    let color = this.colorToMove;
    this.state.check[color] = null;
    this.state.checkmate[color] = null;

    let check = this.isInCheck(color);
    this.state.check[color] = check;
    let mate = this.isCheckmate(color);
    this.state.checkmate[color] = mate;
  }

  isInCheck(color) {
    if (this.state.check[color] != null) {
      return (this.state.check[color]);
    }

    let symbol = color[0].toLowerCase() + 'k';
    let piece = this.findPiece(symbol, true);
    let inCheck = false;
    if (piece) {
      let threatened = isThreatened(piece.x, piece.y, this);
      if (threatened.length > 0) {
        inCheck = true;
      }
    }
    return inCheck;
  }

  isCheckmate(color) {
    if (this.state.checkmate[color] != null) {
      return (this.state.checkmate[color]);
    }

    let mate = true;
    let pieces = this.getPieces(color);
    let king = color[0] + 'k';
    let foundKing = false;
    // If the king is not on the board, can't be checkmate
    for (let piece of pieces) {
      if (piece.symbol === king) {
        foundKing = true;
        break;
      }
    }
    if (!foundKing || !this.isInCheck(color)) {
      mate = false;
    } else {
      outer:
      for (let piece of pieces) {
        let moves = getValidMoves(this, piece);
        for(let move of moves) {
          if (!resultsInCheck(piece.x, piece.y, move[0], move[1], this)) {
            mate = false;
            break outer;
          }
        }
      }
    }
    return mate;
  }

  isPromotion(x1, y1, x2, y2) {
    let symbol = this.getSymbol(x1, y1);
    let promotion = (symbol === 'wp' && y1 === 6 && y2 === 7) ||
    (symbol === 'bp' && y1 === 1 && y2 === 0);
    return promotion;
  }

  addEventListener(type, listener) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  fireEvent(type, data) {
    this.listeners[type].forEach((listener) => {
      listener(data);
    });
  }

  copy() {
    let b = new Board();
    for (let i = 0; i < 8; i++) {
      b.board[i] = this.board[i].slice(0);
    }
    b.colorToMove = this.colorToMove;
    b.hasMoved = {
      white: {
        qr: this.hasMoved.white.qr,
        k: this.hasMoved.white.k,
        kr: this.hasMoved.white.kr,
      },
      black: {
        qr: this.hasMoved.black.qr,
        k: this.hasMoved.black.k,
        kr: this.hasMoved.black.kr,
      }
    };
    return b;
  }

  debug() {
  	let output = '          BOARD\n';
  	for (let y = 7; y >= 0; y--) {
  		let row = '|';
  		for (let x = 0; x < 8; x++) {
  			let content = this.board[x][y];
  			if (content === '') {
  				content = '  ';
  			}
  			row += content + '|';
  		}
  		output += row + '\n';
  	}
  	console.log(output);
    console.log(this.colorToMove + ' to move');
    console.log('check?', this.state.check);
    console.log('mate?', this.state.checkmate);
    console.log('has moved?', this.hasMoved);
  }
}

export { Board };
// window.Board = Board;
