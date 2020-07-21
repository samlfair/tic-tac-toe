import React from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const checkWin = (matrix) => {
  let win = false;
  if (
    matrix[0][0] === matrix[1][1] &&
    matrix[0][0] === matrix[2][2] &&
    matrix[0][0]
  ) {
    win = matrix[0][0];
  }
  if (
    matrix[0][2] === matrix[1][1] &&
    matrix[0][2] === matrix[2][0] &&
    matrix[0][2]
  ) {
    win = matrix[0][2];
  }
  matrix.forEach((row) => {
    if (row[0] === row[1] && row[0] === row[2] && row[0]) {
      win = row[0];
    }
  });
  matrix[0].forEach((column, i) => {
    if (
      matrix[0][i] === matrix[1][i] &&
      matrix[0][i] === matrix[2][i] &&
      matrix[0][i]
    ) {
      win = matrix[0][i];
    }
  });
  return win;
};

class Square extends React.Component {
  render() {
    return (
      <div className="square" onClick={this.props.onClick} style={squareStyle}>
        {this.props.value}
      </div>
    );
  }
}

class Board extends React.Component {
  state = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    xTurn: true,
    winner: null,
  };
  handleClick = (x, y) => {
    const matrix = JSON.parse(JSON.stringify(this.state.board));
    if (!matrix[y][x] && !this.state.winner) {
      matrix[y][x] = this.state.xTurn ? "X" : "O";
      this.setState({ board: matrix, xTurn: !this.state.xTurn });
      const win = checkWin(matrix);
      if (win) this.setState({ winner: win });
    }
  };

  handleReset = () => {
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      xTurn: true,
      winner: null,
    });
  };

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>
          Next player:{" "}
          {this.state.winner ? "Play again?" : this.state.xTurn ? "X" : "O"}
        </div>
        <div className="winner" style={instructionsStyle}>
          Winner: {this.state.winner}
        </div>
        <button style={buttonStyle} onClick={this.handleReset}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.board[0][0]}
              onClick={() => this.handleClick(0, 0)}
            />
            <Square
              value={this.state.board[0][1]}
              onClick={() => this.handleClick(1, 0)}
            />
            <Square
              value={this.state.board[0][2]}
              onClick={() => this.handleClick(2, 0)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.board[1][0]}
              onClick={() => this.handleClick(0, 1)}
            />
            <Square
              value={this.state.board[1][1]}
              onClick={() => this.handleClick(1, 1)}
            />
            <Square
              value={this.state.board[1][2]}
              onClick={() => this.handleClick(2, 1)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.board[2][0]}
              onClick={() => this.handleClick(0, 2)}
            />
            <Square
              value={this.state.board[2][1]}
              onClick={() => this.handleClick(1, 2)}
            />
            <Square
              value={this.state.board[2][2]}
              onClick={() => this.handleClick(2, 2)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
