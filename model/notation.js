import Board from './board.js';
import { getPieceName } from './util.js';

const PAWN_MOVE_REGEX = /^([a-h][1-8]?)?(x)?([a-h][1-8])(\+|#)?$/;
const CASTLING_MOVE_REGEX = /^O-O(-O)?(\+|#)?$/;
const OTHER_PIECE_MOVE_REGEX = 
	/^([NBRQK])([a-h])?([1-8])?(x)?([a-h][1-8])(\+|#)?$/;

function unambiguateMove(move, board) {
	let symbol = move.movedSymbol;
	let start = move.start;
	let end = move.end;
	let pieces = board.findPiece(symbol);
	if (pieces.length < 1) {
		return false;
	}
	for (let piece of pieces) {
		if (piece.x === start.x &&
				piece.y === start.y) {
			continue;
		}
		// Try the move with the other piece
		if (board.isValidMove(piece.x, piece.y,
				end.x, end.y)) {
			let difference = null;
			if (piece.x !== start.x) {
				difference = 'x';
			} else if (piece.y !== start.y) {
				difference = 'y';
			}
			return difference;
		}
	}
	return false;
}

function getCheckOrMateDescription(symbol) {
	if (symbol === '+') {
		return 'Check!';
	} else if (symbol === '#') {
		return 'Checkmate!';
	} else {
		return null;
	}
}

function getPawnMoveDescription(move) {
	let desc = null;
	let matches = PAWN_MOVE_REGEX.exec(move);
	if (matches != null) {
		desc = 'Pawn';
		if (matches[1]) {
			desc += ' on ' + matches[1];
		}
		if (matches[2]) {
			desc += ' captures ';
		} else {
			desc += ' to ';
		}
		// destination square
		desc += matches[3];
		if (matches[4]) {
			desc += ". " + getCheckOrMateDescription(matches[4]);
		}
	}
	return desc;
}

function getOtherMoveDescription(move) {
	let desc = null;
	let matches = OTHER_PIECE_MOVE_REGEX.exec(move);
	if (matches != null) {
		desc = getPieceName('x' + matches[1].toLowerCase());
		if (matches[2] || matches[3]) {
			desc += ' on ';
			if (matches[2]) {
				desc += matches[2];
			}
			if (matches[3]) {
				desc += matches[3];
			}
		}
		if (matches[4]) {
			desc += ' captures ';
		} else {
			desc += ' to ';
		}
		// destination square
		desc += matches[5];
		if (matches[6]) {
			desc += ". " + getCheckOrMateDescription(matches[6]);
		}
	}
	return desc;
}

function getCastlingMoveDescription(move) {
	let desc = null;
	let matches = CASTLING_MOVE_REGEX.exec(move);
	if (matches != null) {
		desc = "Castling, ";
		if (matches[1]) {
			desc += "queen's side";
		} else {
			desc += "king's side";
		}
		if (matches[2]) {
			desc += ". " + getCheckOrMateDescription(matches[2]);
		}
	}
	return desc;
}

class Notation {
	static getAlgebraic(move, board) {
		let piece = move.movedSymbol;
		let oppColor = (piece[0] === 'w' ? 'black' : 'white');
		let end = this.getCoords(move.end.x, move.end.y);
		let isPawn = (piece[1] === 'p');
		let label = '';

		let castlingSide = move.castlingSide;
		if (castlingSide === 'k') {
			label = 'O-O';
		} else if (castlingSide === 'q') {
			label = 'O-O-O';
		} else {
			if (!isPawn) {
				label = piece[1].toUpperCase();
				let unambiguous = unambiguateMove(move, board);
				if (!!unambiguous) {
					let start = this.getCoords(move.start.x,
						move.start.y);
					if (unambiguous.indexOf('x') >= 0) {
						label += start[0];
					}
					if (unambiguous.indexOf('y') >= 0) {
						label += start[1];
					}
				}
			}
			if (move.isCapture) {
				if (isPawn) {
					let start = this.getCoords(move.start.x,
						move.start.y);
					label += start[0];
				}
				label += 'x';
			}
			label += end;
			if (move.promotion) {
				label += move.promotion.toUpperCase();
			}
		}
		if (board.isCheckmate(oppColor)) {
			label += '#';
		} else if (board.isInCheck(oppColor)) {
			label += '+';
		}
		return label;
	}

	static getDescription(algebraic) {
		let desc = '';
		algebraic = algebraic.trim();
		desc = getPawnMoveDescription(algebraic) ||
			getOtherMoveDescription(algebraic) ||
			getCastlingMoveDescription(algebraic);
		return desc;
	}

	static getCoords(x, y) {
	  if (x < 0 || x > 7 || y < 0 || y > 7) {
	    throw new Error("Invalid co-ordinates");
	  }
	  const letters = "abcdefgh";
	  let coords = letters[x] + (y + 1);
	  return coords;
	}

	/**
	  * Get the FEN notation for the given board.
	  * @see https://en.wikipedia.org/wiki/Forsyth–Edwards_Notation
	  */
	static getFEN(board) {
		let fen = '';
		// pieces
		for (let y = 7; y >= 0; y--) {
			let row = '';
			let empty = 0;
			for (let x = 0; x < 8; x++) {
				let symbol = board.getSymbol(x, y);
				if (!symbol) {
					empty++;
				} else {
					if (empty > 0) {
						row += String(empty);
					}
					empty = 0;
					if (symbol[0] === 'w') {
						row += symbol[1].toUpperCase();
					} else {
						row += symbol[1].toLowerCase();
					}
				}
			}
			if (empty > 0) {
				row += String(empty);
			}
			fen += row;
			if (y > 0) {
				fen += '/';
			}
		}
		// player to move
		fen += ' ' + board.colorToMove[0] + ' ';

		// castling
		let hmw = board.hasMoved.white;
		let hmb = board.hasMoved.black;
		let whiteCanCastle = !hmw.k && (!hmw.kr || !hmw.qr);
		let blackCanCastle = !hmb.k && (!hmb.kr || !hmb.qr);
		if (!whiteCanCastle && !blackCanCastle) {
			fen += '-';
		} else {
			if (whiteCanCastle && !hmw.kr) {
				fen += 'K';
			}
			if (whiteCanCastle && !hmw.qr) {
				fen += 'Q';
			}
			if (blackCanCastle && !hmb.kr) {
				fen += 'k';
			}
			if (blackCanCastle && !hmb.qr) {
				fen += 'q';
			}
		}

		return fen;
	}

	/**
	 * Get a Board populated from the given FEN notation.
	 * @see https://en.wikipedia.org/wiki/Forsyth–Edwards_Notation
	 */
	static getBoardFromFEN(fen) {
		let b = new Board();
		let parts = fen.trim().split(' ');
		if (parts.length < 3) {
			throw new Error(`Invalid FEN code: '${fen}'`);
		}

		let rows = parts[0];
		rows = rows.split('/').reverse();
		if (rows.length !== 8) {
			throw new Error(`Invalid FEN code: '${fen}'`);
		}

		for (let y = 0; y < rows.length; y++) {
			let row = rows[y];
			let x = 0;
			let filled = 0;
			for (let char of row) {
				if (/\d/.test(char)) {
					let empties = Number(char);
					for (let e = x; e < empties + x; e++) {
						b.board[e][y] = '';
						filled++;
					}
					x += empties;
				} else if (!/[PpNnBbRrQqKk]/.test(char)) {
					throw new Error(`Invalid FEN code: '${fen}'`);
				} else {
					let isUpper = (char.toUpperCase() === char);
					let symbol = (isUpper ? 'w' : 'b')
						+ char.toLowerCase();
					b.board[x][y] = symbol;
					filled++;
					x++;
				}
			}
			if (filled !== 8) {
				throw new Error(`Invalid FEN code: '${fen}'`);
			}
		}

		// get color to move
		let color = parts[1];
		b.colorToMove = (color === 'w' ? 'white' : 'black');

		// castling ability
		let castlingOptions = parts[2];
		// nobody can castle
		if (castlingOptions === '-') {
			b.hasMoved.white.k = true;
			b.hasMoved.black.k = true;
		} else {
			// white
			if (!/[KQ]/.exec(castlingOptions)) {
				b.hasMoved.white.k = true;
			} else {
				if (!castlingOptions.includes('K')) {
					b.hasMoved.white.kr = true;
				}
				if (!castlingOptions.includes('Q')) {
					b.hasMoved.white.qr = true;
				}
			}
			if (!/[kq]/.exec(castlingOptions)) {
				b.hasMoved.black.k = true;
			} else {
				if (!castlingOptions.includes('k')) {
					b.hasMoved.black.kr = true;
				}
				if (!castlingOptions.includes('q')) {
					b.hasMoved.black.qr = true;
				}
			}
		}
		return b;
	}
}

export default Notation;