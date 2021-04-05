import {
    Bishop,
    King,
    Knight,
    Pawn,
    Queen,
    Rook
} from './pieces.js';

function getPieceName(symbol, textCase = 'title') {
    let name = null;
    switch (symbol[1]) {
        case 'p':
            name = 'Pawn';
            break;
        case 'n':
            name = 'Knight';
            break;
        case 'b':
            name = 'Bishop';
            break;
        case 'r':
            name = 'Rook';
            break;
        case 'q':
            name = 'Queen';
            break;
        case 'k':
            name = 'King';
            break;
        default:
            name = '';
    }
    if (textCase === 'lower') {
        name = name.toLowerCase();
    }
    return name;
}

function getPieceFromSymbol(symbol, x, y) {
    if (symbol.length === 0) {
        return null;
    }
    if (symbol.length !== 2) {
        throw new Error(`Invalid symbol: ${symbol}`);
    }
    let color = (symbol[0] === 'w' ? 'white' : 'black');
    let piece = null;
    let pieceId = symbol[1];
    switch (pieceId) {
        case 'p':
            piece = new Pawn(x, y, color);
            break;
        case 'r':
            piece = new Rook(x, y, color);
            break;
        case 'n':
            piece = new Knight(x, y, color);
            break;
        case 'b':
            piece = new Bishop(x, y, color);
            break;
        case 'q':
            piece = new Queen(x, y, color);
            break;
        case 'k':
            piece = new King(x, y, color);
            break;
        default:
            piece = null;
    }
    return piece;
}

function getOppositeColor(color) {
    if (color === 'white') {
        return 'black';
    } else if (color === 'black') {
        return 'white';
    } else if (color === 'w') {
        return 'b';
    } else if (color === 'b') {
        return 'w';
    } else {
        return null;
    }
}

function getIsJump(x1, y1, x2, y2) {
  return (Math.abs(x2 - x1) > 1) ||
    (Math.abs(y2 - y1) > 1);
}

function getPath(x1, y1, x2, y2) {
  const path = [];
  let size = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;
    // Exclude the final position
  for (let i = 0; i < size - 1; i++) {
    let xAdd = 0;
    let yAdd = 0;
    if (xDiff > 0) {
      xAdd = i + 1;
    } else if (xDiff < 0) {
      xAdd = -i - 1;
    }
    if (yDiff > 0) {
      yAdd = i + 1;
    } else if (yDiff < 0) {
      yAdd = -i - 1;
    }

    path.push([
      x1 + xAdd,
      y1 + yAdd
    ]);
  }
  return path;
}

export {
    getPieceName,
    getPieceFromSymbol,
    getOppositeColor,
    getIsJump,
    getPath,
};
