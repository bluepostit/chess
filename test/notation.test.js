const Move = require('../model/move').default
const Board = require('../model/board').default
const Notation = require('../model/notation').default
const NotationData = require('./data/notation').default

const NEW_BOARD_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq";

function expectFen(board, fen) {
  let actualFen = Notation.getFEN(board)
  let foundIndex = actualFen.indexOf(fen)
  expect(foundIndex).toBe(0)
}

describe('Notation', function() {
  describe('#getFEN()', function() {
    let board = new Board().setup()

    it('should get the expected FEN for a newly setup board', function() {
      let fen = NEW_BOARD_FEN
      expectFen(board, fen)
    })

    it('should get the expected FEN after a move', function() {
      // Nb1-c3
      board.move(1, 0, 2, 2)
      let fen = "rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR b KQkq"
      expectFen(board, fen)
    });
  });

  describe('#getBoardFromFEN()', function() {
    it('should correctly build a board from FEN', function() {
      let board = new Board().setup()
      // Nb1-c3
      board.move(1, 0, 2, 2)

      let fen1 = Notation.getFEN(board)
      let board2 = Notation.getBoardFromFEN(fen1)
      let fen2 = Notation.getFEN(board2)
      expect(fen1).toBe(fen2)
    })

    it('should throw an exception when parsing bad FEN data', function() {
      let data = NotationData['bad-fens']
      for (let fen of data) {
        let fn = function() {
          Notation.getBoardFromFEN(fen)
        }
        expect(fn).toThrow(/Invalid FEN code/)
      }
    })
  })

  describe('#getAlgebraic()', function() {
    it('should get the expected algebraic notation for various moves',
      function() {
        let data = NotationData['move-notation']
        for (let test of data) {
          let board = Notation.getBoardFromFEN(test.fen)
          let promotion = (test.promotion ? test.promotion : null)
          let move = new Move(...test.move, board, promotion)
          let actualNotation = Notation.getAlgebraic(move, board)
          let expectedNotation = test.notation
          expect(actualNotation).toBe(expectedNotation)
        }
      })
  })

  describe('#getDescription()', function() {
    it('should return the correct description for a given move in ' +
      'Algebraic notation',
      function() {
        let data = NotationData['move-descriptions']
        for (let test of data) {
          let desc = Notation.getDescription(test.move)
          expect(desc).toBe(test.desc)
        }
      });
  });
});
