import { ComponentPropsWithRef } from 'react';

// import { Turn } from '../App';

interface GameBoardProps extends ComponentPropsWithRef<'button'> {
   onSquareSelected: (rowIndex: number, columnIndex: number) => void;
   gameBoard: string[][];
}

function GameBoard({ onSquareSelected, gameBoard }: GameBoardProps) {
   //    const [gameBoard, setGameBoard] = useState(startingGameBoard);

   //    function handleSquareSelected(rowIndex: number, columnIndex: number) {
   //       setGameBoard((previousBoard) => {
   //          const newBoard = [
   //             ...previousBoard.map((innerArray) => [...innerArray]),
   //          ];
   //          newBoard[rowIndex][columnIndex] = activePlayerSymbol;
   //          return newBoard;
   //       });

   //       onSquareSelected();
   //    }

   return (
      <ol id="game-board">
         {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
               <ol>
                  {row.map((playerSymbol, columnIndex) => (
                     <li key={columnIndex}>
                        <button
                           onClick={() =>
                              onSquareSelected(rowIndex, columnIndex)
                           }
                           disabled={playerSymbol ? true : false}
                        >
                           {playerSymbol}
                        </button>
                     </li>
                  ))}
               </ol>
            </li>
         ))}
      </ol>
   );
}

export default GameBoard;
