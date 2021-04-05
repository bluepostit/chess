export default [
  { // white pawn promotes to queen
    fen: "8/4P3/8/8/8/8/8/8 w -",
    move: [4, 6, 4, 7],
    promotion: 'q',
    fen2: "4Q3/8/8/8/8/8/8/8 b -"
  },
  { // white pawn promotes to knight
    fen: "8/4P3/8/8/8/8/8/8 w -",
    move: [4, 6, 4, 7],
    promotion: 'n',
    fen2: "4N3/8/8/8/8/8/8/8 b -"
  },
  { // black pawn promotes to rook
    fen: "8/8/8/8/8/8/5p2/8 b -",
    move: [5, 1, 5, 0],
    promotion: 'r',
    fen2: "8/8/8/8/8/8/8/5r2 w -"
  },
]
