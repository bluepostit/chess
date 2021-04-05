export default [
  { // white king's side castling
    fen: "8/8/8/8/8/8/8/4K2R w K",
    moves: [[4, 0, 6, 0]],
    fen2: "8/8/8/8/8/8/8/5RK1 b -"
  },
  { // white queen's side castling
    fen: "8/8/8/8/8/8/8/R3K3 w Q",
    moves: [[4, 0, 2, 0]],
    fen2: "8/8/8/8/8/8/8/2KR4 b -"
  },
  { // black king's side castling
    fen: "4k2r/8/8/8/8/8/8/8 b k",
    moves: [[4, 7, 6, 7]],
    fen2: "5rk1/8/8/8/8/8/8/8 w -"
  },
  { // black queen's side castling
    fen: "r3k3/8/8/8/8/8/8/8 b q",
    moves: [[4, 7, 2, 7]],
    fen2: "2kr4/8/8/8/8/8/8/8 w -"
  },
  { // black king's side castling - obstruction
    fen: "4k1nr/8/8/8/8/8/8/8 b k",
    moves: [[4, 7, 6, 7]],
    error: true,
    fen2: "4k1nr/8/8/8/8/8/8/8 b k"
  },
  { // white queen's side castling - obstruction
    fen: "8/8/8/8/8/8/8/RN2K3 w q",
    moves: [[4, 7, 2, 7]],
    error: true,
    fen2: "8/8/8/8/8/8/8/RN2K3 w q"
  },
  { // white king's side castling - wrong position
    fen: "8/8/8/8/8/8/8/3K3R w K",
    moves: [[3, 0, 6, 0]],
    error: true,
    fen2: "8/8/8/8/8/8/8/3K3R w K"
  },
  { // white queen's side castling - wrong position
    fen: "8/8/8/8/8/8/4K3/R7 w Q",
    moves: [[4, 1, 2, 0]],
    error: true,
    fen2: "8/8/8/8/8/8/4K3/R7 w Q"
  },
  { // white king's side castling - ends in check
    fen: "8/8/8/6r1/8/8/8/4K2R w K",
    moves: [[4, 0, 6, 0]],
    error: true,
    fen2: "8/8/8/6r1/8/8/8/4K2R w K"
  },
  { // white queen's side castling - ends in check
    fen: "8/8/8/8/5b2/8/8/R3K3 w Q",
    moves: [[4, 0, 2, 0]],
    error: true,
    fen2: "8/8/8/8/5b2/8/8/R3K3 w Q"
  },
  { // black king's side castling - through check
    fen: "4k2r/8/8/5R2/8/8/8/8 b k",
    moves: [[4, 7, 6, 7]],
    error: true,
    fen2: "4k2r/8/8/5R2/8/8/8/8 b k"
  },
  { // black queen's side castling - through check
    fen: "r3k3/8/8/3Q4/8/8/8/8 b q",
    moves: [[4, 7, 2, 7]],
    error: true,
    fen2: "r3k3/8/8/3Q4/8/8/8/8 b q"
  },
  { // white king's side castling - moved king
    fen: "k7/8/8/8/8/8/8/4K2R w K",
    moves: [
      [4, 0, 5, 0],
      [0, 7, 1, 7],
      [5, 0, 4, 0], // move it back
      [1, 7, 0, 7],
      [4, 0, 6, 0]
    ],
    error: true,
    fen2: "k7/8/8/8/8/8/8/4K2R w -"
  },
  { // white king's side castling - moved rook
    fen: "k7/8/8/8/8/8/8/4K2R w K",
    moves: [
      [7, 0, 7, 1],
      [0, 7, 1, 7],
      [7, 1, 7, 0], // move it back
      [1, 7, 0, 7],
      [4, 0, 6, 0]
    ],
    error: true,
    fen2: "k7/8/8/8/8/8/8/4K2R w -"
  },
  { // white queen's side castling - moved king
    fen: "7k/8/8/8/8/8/8/R3K3 w Q",
    moves: [
      [4, 0, 4, 1],
      [7, 7, 7, 6],
      [4, 1, 4, 0], // move it back
      [7, 6, 7, 7],
      [4, 0, 2, 0]
    ],
    error: true,
    fen2: "7k/8/8/8/8/8/8/R3K3 w -"
  },
  { // white queen's side castling - moved rook
    fen: "7k/8/8/8/8/8/8/R3K3 w Q",
    moves: [
      [0, 0, 0, 1],
      [7, 7, 7, 6],
      [0, 1, 0, 0], // move it back
      [7, 6, 7, 7],
      [4, 0, 2, 0]
    ],
    error: true,
    fen2: "7k/8/8/8/8/8/8/R3K3 w -"
  },
]
