import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

/* class MyApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: 'ewewe'
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      this.setState({
        inputValue: event.target.value
      });
    }
    render() {
      return (
         <div>
         
  <GetInput value={this.state.inputValue}
  huy={this.handleChange}/>
  <RenderInput huyput={this.state.inputValue} />
          
         </div>
      );
    }
  };
  
  class GetInput extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <h3>Get Input:</h3>
          <input
            value={this.props.input}
            onChange={this.props.huy}/>
        </div>
      );
    }
  };
  
  class RenderInput extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <h3>Input Render:</h3>
          <p>{this.props.huyput}</p>
        </div>
      );
    }
  }; 
   */
  
  function Square (props) {
   
    return (
      <button 
      className={props.winner[0] === props.idSquare || props.winner[1] === props.idSquare || props.winner[2] === props.idSquare ? "square squareHighlight" : "square"}
      onClick={props.onClick}
        >
        {props.value}
    </button>
    );
  
}

class Board extends React.Component {
       
     
  renderSquare(i) {
    let highlight;
    
    return (<Square
             idSquare = {i}
             value={this.props.squares[i]}
             onClick={() => this.props.onClick(i)}
             highlight = {highlight}
             winner = {this.props.winner}
             />
            );
  }

  
render() {
       const children = [];
for (let i = 0; i < 9; i++) {
        children.push(i);
}
    
    
const boardArray = children.map((curVal, ind)=>{
  
      return(
        <div>
         {curVal % 3 === 0  && 
         <div className="board-row">
              {this.renderSquare(ind)}
              {this.renderSquare(ind+1)}
              {this.renderSquare(ind+2)}
              
         </div>  
        }
        </div>  
      )
    });
     return (
         
      <div>
          
          {boardArray}
         
      </div>
    );
   
   
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
     history: [{
       squares: Array(9).fill(null),
     }],
      isXNext: true,
      stepNumber: 0,
      pos:[],
      ClickedButton: '',
      sortBy: "start",
      winComb: "",
     };
  }
  
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const position = this.state.pos.slice(0,this.state.stepNumber );
    position.push(i);
    
    if (calculateWinner(squares)!=="null"||squares[i]){
      return;     
     }
   
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
      pos: position,
      winComb: this.props.winner,
      });
    }

  jumpTo(step){
    
    this.setState({
      ClickedButton: step,
      stepNumber: step,
      isXNext: (step%2===0),
    })
  }
  
  sortBy(){
    if (this.state.sortBy === "start"){
        this.setState({
        sortBy: "end",
      })
    }
    else {this.setState({
      sortBy: "start",
    })}
    
  }  



  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move)=>{
    const position = this.state.pos[move-1];
    const desk = move ?'Перейти к ходу #' + move :'К началу игры';
      return (
        <li key={move}>
           <button id = {move} onClick={() => this.jumpTo(move)}
           className={move=== this.state.ClickedButton && move>0
              ?'activebtn' 
              : 'defaultbtn'}>{desk}
          </button>
          {move>0 && <span>({position === 0 || position === 3 || position === 6? 1 :position === 1|| position === 4 || position === 7?2
              :3},{position<3?1:((position>=3 && position<=5)?2:3)} 
          )</span>}
        </li>
      )
    });

    const movesCopy = [...moves];
    let movesRev=[moves[0]];
    for (let i= movesCopy.length;i>0;i--){
      movesRev.push(moves[i]);
    }

    let status;
    if (winner!=="null") {
      status = 'Выиграл ' + winner[3];
    } else if (winner === "null" && current.squares.indexOf(null)!==-1){
      status = 'Следующий ход: ' + (this.state.isXNext ? 'X' : 'O');
    } else {
      status = 'Ничья!'
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            winner = {winner}
            squares = {current.squares}
            onClick={(i) => this.handleClick(i)}
            />
        </div>
          <div className="game-info">
          <div>{status}</div>
          <button className = "sortButton" onClick={() => this.sortBy()}>Sort by {this.state.sortBy === "start" ? "end" : "start"}</button>
          <ol>{this.state.sortBy === "start" ? moves : movesRev}</ol>
          </div>
      </div>
    );
  }
  
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //return squares[a];
      lines[i].push(squares[a])
      return lines[i];
    }
  }
  return "null";
}
/*  <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */

ReactDOM.render(<Game />, document.getElementById('root'));
