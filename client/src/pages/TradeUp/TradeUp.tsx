// import React, { ChangeEvent, useState } from "react";
import React, { useState } from "react";
import { Contract, Outcome, SkinData } from "../../types/types";
// import TradeUpCalculator from "./TradeUpCalculator";
import TradeUpSearch from "./TradeUpSearch";
import { Container, Row, Col } from "react-bootstrap";

export type TradeUpProps = {
    /** Contract to load, if any */
    loadContract: Contract;

    /** Outcome to load, if any */
    loadOutcome?: Outcome;
}


const TradeUpEditor = ({ loadContract, loadOutcome }: TradeUpProps): React.JSX.Element => {
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [contract, setContract] = useState<Contract>(loadContract);
    const [outcome, setOutcome] = useState<Outcome | undefined>(loadOutcome);

    // function doSkinChange(skinIndex: number) {

    // }

    function handleSkinClick(skin: SkinData): void {
        if(contract.skins.length < 10) {
            const newContract = contract;
            newContract.skins.push(skin);
            setContract(newContract);
            console.log(contract)
            calculateOutcome();
        } else {
            doAddError("Cannot add more than 10 skins!");
        }
    }

    // function handleSkinPriceFloatChange(evt: ChangeEvent): void {
    //     const newContract = contract;
    //     setContract(newContract);
    //     calculateOutcome(newContract);
    // }


    /**
     * Adds error message and clears it after 5 seconds
     * @param {string} error - Error to be shown
     */
    function doAddError(error: string): void {
        setError(error);

        // Clears error
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    /**
     * Calculates contract outcome if there are enough skins inputted
     * @param {Contract} newContract - Contract to calculate the outcome of
     * @returns {Outcome | undefined} - returns Outcome if enough skins are inputted, otherwise undefined
     */
    function calculateOutcome(): void {
        if (contract.skins.length !== 10) {
            setOutcome(undefined);
        } else {
            let skinOutcomes: Map<SkinData, number> = new Map<SkinData, number>();
            for (const skin of contract.skins) {
                // Finds skin outcomes from collection of skin
                console.log(skin)

                // Sets price and probability of skin outcomes
            }

            let expectedValue: number = 0;
            let variance: number = 0;
            for (const entry of skinOutcomes.entries()) {
                expectedValue += entry[0].priceInput * entry[1];
                variance += (entry[0].priceInput ** 2) * entry[1];
            }
            variance -= (expectedValue ** 2);

            setOutcome({
                skinOutcomes,
                expectedValue,
                variance
            });
            console.log(outcome)
        }
    }


    return <>
        <Container fluid >
            <Row>
                <Col>
                    <Container className="colored-container my-3 rounded-3" fluid>
                        <Row className="justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
                            <Col xs={12} md={8} style={{ backgroundColor: '#f0f0f0', padding: '20px', color: "black" }}>
                                Contract Here
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <TradeUpSearch onSkinClick={(skin: SkinData) => handleSkinClick(skin)}/>
                </Col>
            </Row>
        </Container>
        <p>{error}</p>
    </>;
}

export default TradeUpEditor;

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