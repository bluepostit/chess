const { Bishop, King, Knight, Pawn, Queen, Rook } = require('../model/pieces.js')
const MoveData = require('./data/moves').default
const PieceSymbolData = require('./data/names-and-symbols').default

function buildPiece(data) {
  let piece = null
  switch(data.type) {
    case 'king':
      piece = new King(data.x, data.y, data.color)
      break
    case 'queen':
      piece = new Queen(data.x, data.y, data.color)
      break
    case 'bishop':
      piece = new Bishop(data.x, data.y, data.color)
      break
    case 'knight':
      piece = new Knight(data.x, data.y, data.color)
      break
    case 'rook':
      piece = new Rook(data.x, data.y, data.color)
      break
    case 'pawn':
      piece = new Pawn(data.x, data.y, data.color)
      break
    default:
      break
  }
  return piece
}

/**
 * Test the moves for a given data object.
 */
function testPieceMoves(data) {
  for(let test of data) {
    let piece = buildPiece(test.piece)
    test.moves.forEach(function(move) {
      let actualResult = null
      let allowPhrase = move.valid ? "allow" : "not allow"
      let isCapture = false
      if ('capture' in move) {
        isCapture = move.capture
      }
      let verb = isCapture ? 'capture' : 'move'

      actualResult = piece.isValidMove(move.x, move.y, isCapture)
      it(`should ${allowPhrase} ${piece.color} ${piece.name} ` +
         `at (${piece.x}, ${piece.y}) ` +
         `to ${verb} to (${move.x}, ${move.y})`, function() {
        expect(actualResult).toBe(move.valid)
      })
    })
  }
}

describe('Pieces', function () {
  describe('Pawn', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.pawn)
    })

    describe('#canJump()', function() {
      it('should not be able to jump', function() {
        let piece = new Pawn(3, 3, 'white')
        expect(piece.getCanJump()).toBe(false)
      })
    })
  })


  describe('Rook', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.rook)
    })

    describe('#canJump()', function() {
      it('should not be able to jump', function() {
        let piece = new Rook(3, 3, 'white')
        expect(piece.getCanJump()).toBe(false)
      })
    })
  })

  describe('Bishop', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.bishop)
    })

    describe('#canJump()', function() {
      it('should not be able to jump', function() {
        let piece = new Bishop(3, 3, 'white')
        expect(piece.getCanJump()).toBe(false)
      })
    })
  })

  describe('Knight', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.knight)
    })

    describe('#canJump()', function() {
      it('should be able to jump', function() {
        let piece = new Knight(3, 3, 'white')
        expect(piece.getCanJump()).toBe(true)
      })
    })
  })

  describe('Queen', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.queen)
    })

    describe('#canJump()', function() {
      it('should not be able to jump', function() {
        let piece = new Queen(3, 3, 'white')
        expect(piece.getCanJump()).toBe(false)
      })
    })
  })

  describe('King', function() {
    describe('#isValidMove()', function() {
      testPieceMoves(MoveData.king)
    })

    describe('#canJump()', function() {
      it('should not be able to jump', function() {
        let piece = new King(3, 3, 'white')
        expect(piece.getCanJump()).toBe(false)
      })
    })
  })

  describe('Piece Names and Symbols', function() {
    it('should return the correct name and symbol for various pieces',
        function() {
      for(let data of PieceSymbolData) {
        let piece = buildPiece(data.piece)
        expect(piece.name).toBe(data.info.name)
        expect(piece.symbol).toBe(data.info.symbol)
      }
    })
  })
})
