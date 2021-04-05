class Piece {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	isValidMove(x, y, capture) {
		throw new Error("isValidMove() not defined for this class");
	}

	getCanJump() {
		return false;
	}

	get name() {
		throw new Error("name not defined for this class");
	}

	equals(piece) {
		return (piece.name === this.name &&
			piece.x === this.x &&
			piece.y === this.y &&
			piece.color === this.color);
	}

	get symbol() {
		return this.color[0] + 
			this.name[0].toLowerCase();
	}
}

class Pawn extends Piece {
	get name() {
		return 'Pawn';
	}

	isValidMove(x, y, capture) {
		const xDiff = x - this.x;
		const yDiff = y - this.y;
		if (this.x === x && !capture) {
			if (this.color === 'white') {
				return (yDiff === 1) || (this.y === 1 && yDiff === 2); 
			} else {
				return (yDiff === -1) || (this.y === 6 && yDiff === -2);
			}
		} else if (capture && (xDiff === 1 || xDiff === -1)) {
			return (yDiff === 1 && this.color === 'white') ||
				(yDiff === -1 && this.color === 'black');
		} else {
			return false;
		}
	}
}

class Rook extends Piece {
	get name() {
		return 'Rook';
	}

	isValidMove(x, y) {
		const xDiff = x - this.x;
		const yDiff = y - this.y;
		return (xDiff === 0 && yDiff !== 0) ||
			(yDiff === 0 && xDiff !== 0);
	}
}

class Bishop extends Piece {
	get name() {
		return 'Bishop';
	}

	isValidMove(x, y) {
		const xDiff = x - this.x;
		const yDiff = y - this.y;
		return Math.abs(xDiff) === Math.abs(yDiff);
	}
}

class Knight extends Piece {
	get name() {
		return 'Knight';
	}

	isValidMove(x, y) {
		const xDiffAbs = Math.abs(x - this.x);
		const yDiffAbs = Math.abs(y - this.y);
		if (xDiffAbs === 1) {
			return yDiffAbs === 2;
		} else if (xDiffAbs === 2) {
			return yDiffAbs === 1;
		} else {
			return false;
		}
	}

	getCanJump() {
		return true;
	}

	get symbol() {
		return this.color[0] + 'n';
	}
}

class Queen extends Piece {
	get name() {
		return 'Queen';
	}

	isValidMove(x, y) {
		const xDiff = x - this.x;
		const yDiff = y - this.y;
		return (xDiff === 0 && yDiff !== 0) ||
			(yDiff === 0 && xDiff !== 0) ||
			(Math.abs(xDiff) === Math.abs(yDiff));
	}
}

class King extends Piece {
	get name() {
		return 'King';
	}

	isValidMove(x, y) {
		const xDiff = x - this.x;
		const yDiff = y - this.y;
		if (x === this.x && y === this.y) {
			return false;
		}
		return Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1;
	}
}

export { Bishop, King, Knight, Pawn, Queen, Rook };