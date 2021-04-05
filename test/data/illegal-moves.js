export default new Set([
  {
    positions: [0, 1, 0, 4] // pawn 3-move
  },
  {
    positions: [0, 1, 1, 1] // rook x own knight
  },
  {
    positions: [0, 1, 1, 2] // pawn non-capture
  },
  {
    positions: [0, 0, 0, 1] // rook x own pawn
  },
  {
    positions: [0, 0, 2, 0] // rook jump, x own bishop
  },
  {
    positions: [1, 0, 3, 1] // knight x own pawn
  },
  {
    positions: [3, 6, 3, 7] // black pawn backwards
  },
  {
    positions: [3, 6, 4, 7] // black pawn capture own king
  },
  {
    positions: [1, 7, 2, 7] // pawn sideways move
  },
  {
    positions: [2, 7, 5, 4] // bishop jump
  },
])
