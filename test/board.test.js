const { Bishop, King, Knight, Pawn, Queen, Rook } = require('../model/pieces.js')
const ChessBoard = require('../model/board.js').default
const Notation = require('../model/notation.js').default
const { getPath } = require('../model/util.js')

class Board extends ChessBoard {
	setup() {
		super.setup()
		this.board = [
        ['wr', 'wp', '', '', '', '', 'bp', 'br'],
        ['wn', 'wp', '', '', '', '', 'bp', 'bn'],
        ['wb', 'wp', '', '', '', '', 'bp', 'bb'],
        ['wq', 'wp', '', '', '', '', 'bp', 'bq'],
        ['wk', 'wp', '', '', '', '', 'bp', 'bk'],
        ['wb', 'wp', '', '', '', '', 'bp', 'bb'],
        ['wn', 'wp', '', '', '', '', 'bp', 'bn'],
        ['wr', 'wp', '', '', '', '', 'bp', 'br'],
    ]
    return this
	}
}

test('initial setup', () => {
  const expected = require('./data/pieces-from-start').default

  const board = new Board().setup()
  for(let [pos, piece] of expected) {
    const realPiece = board.get(pos.x, pos.y)
    expect(piece).toEqual(realPiece)
  }
})

test('calculates paths correctly', () => {
	let data = require('./data/paths').default
	for (let story of data) {
		const path = getPath(...story.start, ...story.end)
    expect(path).toEqual(story.path)
	}
})

test('allows legal moves', () => {
	const board = new Board()

	const moves = require('./data/legal-moves-from-start').default
	for (let move of moves) {
		let [x1, y1, x2, y2] = move.positions
		board.setup()
		// 'Cheat' the board to allow moving of black pieces first
		board.colorToMove = move.piece.color
    board.move(x1, y1, x2, y2)

		let oldPos = board.get(x1, y1)
		let newPos = board.get(x2, y2)
    expect(oldPos).toBeNull()
    expect(newPos).toEqual(move.piece)
	}
})

test('prevents illegal moves', () => {
	const board = new Board()
	const moves = require('./data/illegal-moves').default

	for (let move of moves) {
		board.setup()
    expect(() => {
      board.move(...move.positions)
    }).toThrow()
	}
})

test('prevents moving out of turn', () => {
  let board = new Board().setup()
  board.move(3, 1, 3, 3)
  expect(() => {
    board.move(4, 1, 4, 2)
  }).toThrow()
})

test('pawn promotion', () => {
  const data = require('./data/pawn-promotion').default

  for (let story of data) {
    const fen = story.fen
    const board = Notation.getBoardFromFEN(fen)
    board.move(...story.move, board, story.promotion)
    const fen2 = Notation.getFEN(board)
    expect(story.fen2).toEqual(fen2)
  }
})


test('castling', () => {
	const data = require('./data/castling').default

	for (let story of data) {
		const board = Notation.getBoardFromFEN(story.fen)
    if (story.error) {
      expect(() => {
        for (let move of story.moves) {
          board.move(...move)
        }
      }).toThrow()
    } else {
      for (let move of story.moves) {
        board.move(...move)
      }
      const fen2 = Notation.getFEN(board)
      expect(story.fen2).toEqual(fen2)
    }
	}
})
