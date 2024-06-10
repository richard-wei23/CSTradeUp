// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './style.css';

// function Pokemon({ pokemonId }) {
//   const [isShiny, setShiny] = useState(false);
//   const [imageSrc, setImageSrc] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/329px-MissingNo.svg.png");
//   const [pokemonName, setPokemonName] = useState("");
  
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => {
//     res.json().then((pokemonData) => {
//       console.log(isShiny)
//       setPokemonName(pokemonData.name);
//       setImageSrc(`https://img.pokemondb.net/sprites/home/${isShiny ? "shiny": "normal"}/${pokemonData.name}.png`);
//     });
//   });

//   function onShinyClick() {
//     setShiny(!isShiny);
//   }
  
//   return <>
//     <p className="font-weight-bold">{pokemonName}</p>
//     <img src={imageSrc} onClick={() => onShinyClick()}/>
//   </>;
// }

// function Move({ move, onMoveClick }) {
//   return <>
//   </>;
// }

// function MoveList({ pokemonId }) {
//   return <>
//   </>;
// }

// function Stats({ pokemonId }) {
//   return <>
//   </>;
// }

// export default function Card() {
//   const [pokemonId, setPokemonId] = useState(1);
//   const [moves, setMoves] = useState({});

//   function onArrowClick(i) {
//     setPokemonId((pokemonId + i + 1024) % 1025 + 1); 
//   }

//   return <>
//     <div><button id="lArrow" className="arrow left" onClick={() => onArrowClick(-1)} /></div>
//     <div>
//       <Pokemon pokemonId={pokemonId} />
//       <Stats pokemonId={pokemonId} />
//       <MoveList pokemonId={pokemonId} />
//     </div>
//     <div><button id="rArrow" className="arrow right" onClick={() => onArrowClick(1)} /></div>
//   </>;
// }






// function Square({ val , onSquareClick }) {
//   return <>
//   <button className="square" onClick={onSquareClick}>{val}</button>
// </>;
// }

// export default function Board() {
// const [squares, setSquares] = useState(Array(9).fill(null));
// const [xIsNext, setXIsNext] = useState(true);

// const winner = calculateWinner(squares);
// let status;
// if(winner) {
//   status = "Winner: " + winner;
// } else {
//   status = "Next player's move: " + (xIsNext ? "X" : "O");
// }

// function onSquareClick(i) {
//   if(squares[i] || calculateWinner(squares)) {
//     return;
//   }
//   const nextSquares = squares.slice();
//   if(xIsNext) {
//     nextSquares[i] = "X";
//   } else {
//     nextSquares[i] = "O";
//   }
//   setSquares(nextSquares);
//   setXIsNext(!xIsNext);
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// return <>
//   <div className="status">{status}</div>
//   <div className={"board-row"}>
//     <Square val={squares[0]} onSquareClick={() => onSquareClick(0)}/>
//     <Square val={squares[1]} onSquareClick={() => onSquareClick(1)}/>
//     <Square val={squares[2]} onSquareClick={() => onSquareClick(2)}/>
//   </div>
//   <div className={"board-row"}>
//     <Square val={squares[3]} onSquareClick={() => onSquareClick(3)}/>
//     <Square val={squares[4]} onSquareClick={() => onSquareClick(4)}/>
//     <Square val={squares[5]} onSquareClick={() => onSquareClick(5)}/>
//   </div>
//   <div className={"board-row"}>
//     <Square val={squares[6]} onSquareClick={() => onSquareClick(6)}/>
//     <Square val={squares[7]} onSquareClick={() => onSquareClick(7)}/>
//     <Square val={squares[8]} onSquareClick={() => onSquareClick(8)}/>
//   </div>
// </>;
// }