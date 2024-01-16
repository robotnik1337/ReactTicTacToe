import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const startingGameBoard = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
];

export interface Turn {
   square: { row: number; column: number };
   player: string;
}

function getCurrentPlayer(gameTurns: Turn[]) {
   let currentPlayer = 'X';
   if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O';
   return currentPlayer;
}

function App() {
   const [players, setPlayers] = useState({
      X: 'Player 1',
      O: 'Player 2',
   });

   const [gameTurns, setGameTurns] = useState<Turn[]>([]);

   const activePlayer = getCurrentPlayer(gameTurns);

   let currentGameBoard = [
      ...startingGameBoard.map((innerArray) => [...innerArray]),
   ];
   let winner;

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, column } = square;

      currentGameBoard[row][column] = player;
   }

   for (const combination of WINNING_COMBINATIONS) {
      const firstSymbol =
         currentGameBoard[combination[0].row][combination[0].column];
      const secondSymbol =
         currentGameBoard[combination[1].row][combination[1].column];
      const thirdSymbol =
         currentGameBoard[combination[2].row][combination[2].column];

      if (
         firstSymbol &&
         firstSymbol === secondSymbol &&
         firstSymbol === thirdSymbol
      )
         winner = players[firstSymbol as keyof typeof players];
   }

   const draw = gameTurns.length >= 9 && !winner;

   function handleSquareSelected(rowIndex: number, columnIndex: number) {
      setGameTurns((previousTurns) => {
         const currentPlayer = getCurrentPlayer(previousTurns);
         const newTurns = [
            {
               square: { row: rowIndex, column: columnIndex },
               player: currentPlayer,
            },
            ...previousTurns,
         ];

         return newTurns;
      });
   }

   // prettier-ignore
   function handleRestart() { setGameTurns([]); }

   function handleNameChanged(playerSymbol: string, newPlayerName: string) {
      setPlayers((previousPlayers) => {
         return { ...previousPlayers, [playerSymbol]: newPlayerName };
      });
   }

   return (
      <main>
         <div id="game-container">
            <ol id="players" className="highlight-player">
               <Player
                  startingName="Player 1"
                  symbol="X"
                  isActive={activePlayer === 'X'}
                  onNameChanged={handleNameChanged}
               />
               <Player
                  startingName="Player 2"
                  symbol="O"
                  isActive={activePlayer === 'O'}
                  onNameChanged={handleNameChanged}
               />
            </ol>
            {(winner || draw) && (
               <GameOver winner={winner} onRematch={handleRestart} />
            )}
            <GameBoard
               onSquareSelected={handleSquareSelected}
               gameBoard={currentGameBoard}
            />
         </div>
         <Log gameLog={gameTurns} />
      </main>
   );
}

export default App;
