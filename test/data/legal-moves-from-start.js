import { Pawn, Knight } from '../../model/pieces'

export default new Set([
  {
    positions: [0, 1, 0, 2],
    piece: new Pawn(0, 2, 'white')
  },
  {
    positions: [0, 1, 0, 3],
    piece: new Pawn(0, 3, 'white')
  },
  {
    positions: [1, 0, 2, 2],
    piece: new Knight(2, 2, 'white')
  },
  {
    positions: [1, 0, 0, 2],
    piece: new Knight(0, 2, 'white')
  },
  {
    positions: [3, 6, 3, 5],
    piece: new Pawn(3, 5, 'black')
  },
  {
    positions: [4, 6, 4, 4],
    piece: new Pawn(4, 4, 'black')
  },
  {
    positions: [1, 7, 2, 5],
    piece: new Knight(2, 5, 'black')
  },
  {
    positions: [6, 7, 7, 5],
    piece: new Knight(7, 5, 'black')
  },
])
