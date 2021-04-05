export default {
  "move-notation": [{ // white pawn
      fen: "8/8/8/8/8/8/3PP3/8 w -",
      move: [3, 1, 3, 3],
      notation: "d4"
    }, { // white pawn promotes to queen
      fen: "8/4P3/8/8/8/8/8/8 w -",
      move: [4, 6, 4, 7],
      promotion: 'q',
      notation: "e8Q"
    }, { // white king's side castling
      fen: "8/8/8/8/8/8/8/4K2R w K",
      move: [4, 0, 6, 0],
      notation: "O-O"
    }, { // white queen's side castling
      fen: "8/8/8/8/8/8/8/R3K3 w Q",
      move: [4, 0, 2, 0],
      notation: "O-O-O"
    }, { // black king's side castling
      fen: "4k2r/8/8/8/8/8/8/8 b k ",
      move: [4, 7, 6, 7],
      notation: "O-O"
    }, { // black queen's side castling
      fen: "r3k3/8/8/8/8/8/8/8 b q",
      move: [4, 7, 2, 7],
      notation: "O-O-O"
    },
    // AMBIGUOUS NOTATION
    {
      fen: "8/8/2N5/8/8/8/4N3/8 w -",
      move: [2, 5, 3, 3],
      notation: "Ncd4"
    }, { // black knights, same x
      fen: "8/8/2n5/8/8/8/2n5/8 b -",
      move: [2, 5, 3, 3],
      notation: "N6d4"
    }, { // black knights, same y
      fen: "8/8/2n1n3/8/8/8/8/8 b -",
      move: [2, 5, 3, 3],
      notation: "Ncd4"
    }, { // white pawns, same y [not ambiguous]
      fen: "8/8/8/8/8/3q4/2P1P3/8 w -",
      move: [2, 1, 3, 2],
      notation: "cxd3"
    }
  ],
  "bad-fens": [
    // empty string
    '',
    // not enough slashes
    'pppppppp w -',
    '8/pppppppp/ w -',
    '8/8/8/8/8/8/8 w -',
    // too many slashes
    '8/8/8/8/8/8/8/8/ w -',
    '8/pppppppp/8/8/8/8/8/4K3/pppppppp w -',
    // empty row
    '8//8/8/8/8/PPPPPPPP/8 w -',
    '//8/8/8/8/8/K7 w -',
    // not enough characters on a row
    '7/8/8/8/8/8/8/7K w -',
    '8/pppppppp/8/8/8/8/6p/8 w -',
    '8/ppppppp/8/8/8/8/8/8 b -',
    // invalid characters
    'a7/8/8/8/8/8/8/8 b -',
    '8/pppppupp/8/8/8/8/8/4K3 w -',
  ],
  "move-descriptions": [
    // Pawns
    {
      move: 'e2',
      desc: 'Pawn to e2'
    }, {
      move: 'f3',
      desc: 'Pawn to f3'
    }, {
      move: 'a6+',
      desc: 'Pawn to a6. Check!'
    }, {
      move: 'fxe5',
      desc: 'Pawn on f captures e5'
    }, {
      move: 'f4xe3',
      desc: 'Pawn on f4 captures e3'
    }, {
      move: 'a7xb6#',
      desc: 'Pawn on a7 captures b6. Checkmate!'
    },
    // Castling
    {
      move: 'O-O',
      desc: "Castling, king's side"
    }, {
      move: 'O-O-O',
      desc: "Castling, queen's side"
    }, {
      move: 'O-O+',
      desc: "Castling, king's side. Check!"
    }, {
      move: 'O-O-O#',
      desc: "Castling, queen's side. Checkmate!"
    },
    // Other moves
    {
      move: 'Nb6',
      desc: "Knight to b6"
    }, {
      move: 'Ra4',
      desc: "Rook to a4"
    }, {
      move: 'Bg3+',
      desc: "Bishop to g3. Check!"
    }, {
      move: 'Qc1#',
      desc: "Queen to c1. Checkmate!"
    }, {
      move: 'Nxb6',
      desc: "Knight captures b6"
    }, {
      move: 'Rxa4',
      desc: "Rook captures a4"
    }, {
      move: 'Bxg3+',
      desc: "Bishop captures g3. Check!"
    }, {
      move: 'Qxc1#',
      desc: "Queen captures c1. Checkmate!"
    }, {
      move: 'Nab6',
      desc: "Knight on a to b6"
    }, {
      move: 'R3a4',
      desc: "Rook on 3 to a4"
    }, {
      move: 'Bf2g3+',
      desc: "Bishop on f2 to g3. Check!"
    }, {
      move: 'Kc1#',
      desc: "King to c1. Checkmate!"
    },
  ]
}