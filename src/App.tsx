import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
   X: 'Player 1',
   O: 'Player 2',
};

const STARTING_GAME_BOARD = [
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

function getGameWinner(
   currentGameBoard: string[][],
   players: { X: string; O: string }
) {
   let winner;

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
   return winner;
}

function buildGameBoard(gameTurns: Turn[]) {
   let currentGameBoard = [
      ...STARTING_GAME_BOARD.map((innerArray) => [...innerArray]),
   ];

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, column } = square;

      currentGameBoard[row][column] = player;
   }
   return currentGameBoard;
}

function App() {
   const [gameTurns, setGameTurns] = useState<Turn[]>([]);
   const [players, setPlayers] = useState({
      X: 'Player 1',
      O: 'Player 2',
   });

   const activePlayer = getCurrentPlayer(gameTurns);
   const currentGameBoard = buildGameBoard(gameTurns);
   const gameWinner = getGameWinner(currentGameBoard, players);
   const draw = gameTurns.length >= 9 && !gameWinner;

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
                  startingName={PLAYERS.X}
                  symbol="X"
                  isActive={activePlayer === 'X'}
                  onNameChanged={handleNameChanged}
               />
               <Player
                  startingName={PLAYERS.O}
                  symbol="O"
                  isActive={activePlayer === 'O'}
                  onNameChanged={handleNameChanged}
               />
            </ol>
            {(gameWinner || draw) && (
               <GameOver winner={gameWinner} onRematch={handleRestart} />
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
