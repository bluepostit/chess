export default {
  'pawn': [{
    "piece": {
      "color": "white",
      "type": "pawn",
      "x": 3,
      "y": 1
    },
    "moves": [
      // same x
      {
        "x": 3,
        "y": 2,
        "valid": true
      }, {
        "x": 3,
        "y": 3,
        "valid": true
      }, {
        "x": 3,
        "y": 4,
        "valid": false
      }, {
        "x": 3,
        "y": 0,
        "valid": false
      },
      // same y
      {
        "x": 2,
        "y": 1,
        "valid": false
      }, {
        "x": 4,
        "y": 1,
        "valid": false
      },
      // capturing
      {
        "x": 2,
        "y": 2,
        "capture": true,
        "valid": true
      }, {
        "x": 4,
        "y": 2,
        "capture": true,
        "valid": true
      }, {
        "x": 5,
        "y": 2,
        "capture": true,
        "valid": false
      }, {
        "x": 5,
        "y": 3,
        "capture": true,
        "valid": false
      },
    ]
  }, {
    "piece": {
      "color": "white",
      "type": "pawn",
      "x": 3,
      "y": 2
    },
    "moves": [
      // same x
      {
        "x": 3,
        "y": 3,
        "valid": true
      }, {
        "x": 3,
        "y": 4,
        "valid": false
      }
    ]
  }, {
    "piece": {
      "color": "black",
      "type": "pawn",
      "x": 3,
      "y": 6
    },
    "moves": [
      // same x
      {
        "x": 3,
        "y": 5,
        "valid": true
      }, {
        "x": 3,
        "y": 4,
        "valid": true
      }, {
        "x": 3,
        "y": 3,
        "valid": false
      }, {
        "x": 3,
        "y": 7,
        "valid": false
      },
      // same y
      {
        "x": 2,
        "y": 6,
        "valid": false
      }, {
        "x": 4,
        "y": 6,
        "valid": false
      },
      // capturing
      {
        "x": 2,
        "y": 5,
        "capture": true,
        "valid": true
      }, {
        "x": 4,
        "y": 5,
        "capture": true,
        "valid": true
      }, {
        "x": 5,
        "y": 2,
        "capture": true,
        "valid": false
      }, {
        "x": 5,
        "y": 3,
        "capture": true,
        "valid": false
      },
    ]
  }, {
    "piece": {
      "color": "black",
      "type": "pawn",
      "x": 3,
      "y": 5
    },
    "moves": [
      // same x
      {
        "x": 3,
        "y": 4,
        "valid": true
      }, {
        "x": 3,
        "y": 3,
        "valid": false
      }
    ]
  }],
  'rook': [{
    "piece": {
      "color": "white",
      "type": "rook",
      "x": 3,
      "y": 3
    },
    "moves": [
      // same x
      {
        "x": 3,
        "y": 4,
        "valid": true
      }, {
        "x": 3,
        "y": 0,
        "valid": true
      }, {
        "x": 3,
        "y": 7,
        "valid": true
      },
      // same y
      {
        "x": 2,
        "y": 3,
        "valid": true
      }, {
        "x": 0,
        "y": 3,
        "valid": true
      }, {
        "x": 7,
        "y": 3,
        "valid": true
      },
      // both different
      {
        "x": 2,
        "y": 2,
        "valid": false
      }, {
        "x": 0,
        "y": 4,
        "valid": false
      }, {
        "x": 7,
        "y": 1,
        "valid": false
      },
    ]
  }],
  'bishop': [{
    "piece": {
      "color": "white",
      "type": "bishop",
      "x": 3,
      "y": 3
    },
    "moves": [
      // diagonals
      {
        "x": 4,
        "y": 4,
        "valid": true
      }, {
        "x": 5,
        "y": 5,
        "valid": true
      }, {
        "x": 0,
        "y": 0,
        "valid": true
      }, {
        "x": 4,
        "y": 2,
        "valid": true
      }, {
        "x": 5,
        "y": 1,
        "valid": true
      }, {
        "x": 1,
        "y": 5,
        "valid": true
      },
      // not diagonals
      {
        "x": 2,
        "y": 3,
        "valid": false
      }, {
        "x": 0,
        "y": 4,
        "valid": false
      }, {
        "x": 7,
        "y": 1,
        "valid": false
      },
    ]
  }],
  'knight': [{
    "piece": {
      "color": "white",
      "type": "knight",
      "x": 3,
      "y": 3
    },
    "moves": [{
      "x": 5,
      "y": 4,
      "valid": true
    }, {
      "x": 5,
      "y": 2,
      "valid": true
    }, {
      "x": 4,
      "y": 5,
      "valid": true
    }, {
      "x": 4,
      "y": 1,
      "valid": true
    }, {
      "x": 2,
      "y": 5,
      "valid": true
    }, {
      "x": 2,
      "y": 1,
      "valid": true
    }, {
      "x": 1,
      "y": 2,
      "valid": true
    }, {
      "x": 1,
      "y": 4,
      "valid": true
    }, {
      "x": 2,
      "y": 3,
      "valid": false
    }, {
      "x": 0,
      "y": 4,
      "valid": false
    }, {
      "x": 7,
      "y": 1,
      "valid": false
    }, ]
  }],
  'queen': [{
    "piece": {
      "color": "white",
      "type": "queen",
      "x": 3,
      "y": 3
    },
    "moves": [
      // diagonals
      {
        "x": 4,
        "y": 4,
        "valid": true
      }, {
        "x": 5,
        "y": 5,
        "valid": true
      }, {
        "x": 0,
        "y": 0,
        "valid": true
      }, {
        "x": 4,
        "y": 2,
        "valid": true
      }, {
        "x": 5,
        "y": 1,
        "valid": true
      }, {
        "x": 1,
        "y": 5,
        "valid": true
      },
      // invalid moves
      {
        "x": 2,
        "y": 5,
        "valid": false
      }, {
        "x": 0,
        "y": 4,
        "valid": false
      }, {
        "x": 7,
        "y": 1,
        "valid": false
      },
      // same x
      {
        "x": 3,
        "y": 4,
        "valid": true
      }, {
        "x": 3,
        "y": 0,
        "valid": true
      }, {
        "x": 3,
        "y": 7,
        "valid": true
      },
      // same y
      {
        "x": 2,
        "y": 3,
        "valid": true
      }, {
        "x": 0,
        "y": 3,
        "valid": true
      }, {
        "x": 7,
        "y": 3,
        "valid": true
      },
    ]
  }],
  'king': [{
    "piece": {
      "color": "white",
      "type": "king",
      "x": 3,
      "y": 3
    },
    "moves": [
      // diagonals
      {
        "x": 2,
        "y": 2,
        "valid": true
      }, {
        "x": 2,
        "y": 4,
        "valid": true
      }, {
        "x": 4,
        "y": 2,
        "valid": true
      }, {
        "x": 4,
        "y": 4,
        "valid": true
      },
      // same x
      {
        "x": 3,
        "y": 2,
        "valid": true
      }, {
        "x": 3,
        "y": 4,
        "valid": true
      },
      // same y
      {
        "x": 2,
        "y": 3,
        "valid": true
      }, {
        "x": 4,
        "y": 3,
        "valid": true
      },
      // invalid moves
      {
        "x": 3,
        "y": 5,
        "valid": false
      }, {
        "x": 4,
        "y": 5,
        "valid": false
      }, {
        "x": 5,
        "y": 3,
        "valid": false
      }, {
        "x": 5,
        "y": 6,
        "valid": false
      }
    ]
  }],
};