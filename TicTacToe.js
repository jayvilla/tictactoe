var prompt = require('prompt');

const schema = {
    properties: {
      move: {
        pattern: /[0-2]\,[0-2]/,
        message: 'Move must be entered in this format 0,0',
        required: true
      }
    }
  };

class TicTacToe {
  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer;
    this.players = { playerOne: 'X', playerTwo: 'O' };
    this.gameOver = false;
    this.movesLeft = 9;

    this.chooseFirstPick()
    this.startGame();
  }

  startGame() {
    this.playTurn(this.currentPlayer);
  }

  chooseFirstPick() {
    var number = Math.floor((Math.random() * 100) + 1);
    if (number % 2 === 0) {
      this.currentPlayer = 'playerOne';
      console.log('playerOne goes first!\n')
    } else {
      this.currentPlayer = 'playerTwo';
      console.log('playerTwo goes first!\n')
    }
  }

  showBoard() {
    var board = this.board;
    console.log(`${board[0][0]}     |    ${board[0][1]}     |     ${board[0][2]}`);
    console.log('----------------------')
    console.log(`${board[1][0]}     |    ${board[1][1]}     |     ${board[1][2]}`);
    console.log('----------------------')
    console.log(`${board[2][0]}     |    ${board[2][1]}     |     ${board[2][2]}`);
  }

  checkWin() {
    if (this.checkRows() || this.checkDiagonals() || this.checkColumns()) {
      this.gameOver = true;
      return true;
      console.log(`${this.currentPlayer} wins!\n`)
    }
  }

  checkRows() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].join('') === 'XXX' || this.board[i].join('') === 'OOO') {
        return true;
      }
    }
    return false;
  }

  checkColumns() {
    const board = this.board;
    const leftCol = `${board[0][0]}${board[1][0]}${board[2][0]}`;
    const midCol = `${board[0][1]}${board[1][1]}${board[2][1]}`;
    const rightCol = `${board[0][2]}${board[1][2]}${board[2][2]}`;

    if (leftCol === 'XXX' || midCol === 'XXX' || rightCol === 'XXX' || leftCol === 'OOO' || midCol === 'OOO' || rightCol === 'OOO') {
      return true;
    }
    return false;
  }

  checkDiagonals() {
    const board = this.board;
    const leftDiag = `${board[0][0]}${board[1][1]}${board[2][2]}`;
    const rightDiag = `${board[0][2]}${board[1][1]}${board[2][0]}`;

    if (leftDiag === 'XXX' || leftDiag === 'OOO' || rightDiag === 'XXX' || rightDiag === 'OOO') {
      return true;
    }
    return false;
  }

  playTurn(player) {
    this.showBoard();
    
    if (this.gameOver) {
      console.log(`Gameover ${this.currentPlayer} wins!\n`)
    } else if (this.movesLeft <= 0) {
      console.log('Cat\'s game!');
    } else {
      console.log(`${this.currentPlayer}'s turn\n`)

      prompt.start();
      prompt.get(schema, (err, result) => {

        var move = result.move;
        move.split('')
        var x = parseInt(move[0]);
        var y = parseInt(move[2]);
        
        var mark;

        if (this.currentPlayer === 'playerOne') {
          mark = this.players.playerOne;
        } else {
          mark = this.players.playerTwo;
        }

        if (this.validMove(x, y)) {
          this.board[x][y] = mark;
          this.checkWin();

          if (this.currentPlayer === 'playerOne') {
            this.currentPlayer = 'playerTwo';
            --this.movesLeft;
            this.playTurn(this.currentPlayer);
          } else {
            this.currentPlayer = 'playerOne';
            --this.movesLeft;
            this.playTurn(this.currentPlayer);
          }
        } else {
          console.log('This is an invalid move. Try again\n');
          this.playTurn(this.currentPlayer);
        }
      }) 
    }
  }

  validMove(x, y) {
    return !this.board[x][y] ? true : false;
  }
}

const game1 = new TicTacToe();
