import { useEffect, useState } from "react";
import './../style.css';
import { Contract, Result } from "../types/types";

type EditorProps = {
    /** Contract to load, if any */
    loadContract: Contract;

    /** Result to load, if any */
    loadResult: Result;
}

const Editor = ({ loadContract, loadResult }: EditorProps): React.JSX.Element => {
    const [contract, setContract] = useState<Contract>(loadContract);
    const [calculation, setCalculation] = useState<Result>(loadResult);

    function onSkinClick(i: MouseEvent) {
      setContract(contract);
    }

    // useEffect to recalculate tradeup when skin changes
    useEffect(() => {
        const newCalculation = calcTradeUp(contract);
        setCalculation(newCalculation);
    }, [contract]);
    
    return <>
        
    </>;
}

// function Move({ move, onMoveClick }) {
//     return <>
//     </>;
// }

export default Editor;


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