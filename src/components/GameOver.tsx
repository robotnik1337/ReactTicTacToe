interface GameOverProps {
   winner: string | undefined;
   onRematch: React.MouseEventHandler<HTMLButtonElement>;
}

function GameOver({ winner, onRematch }: GameOverProps) {
   return (
      <div id="game-over">
         <h2>Game over!</h2>
         {winner && <p>{winner} won!</p>}
         {!winner && <p>It's a draw.</p>}
         <p>
            <button onClick={onRematch}>Rematch!</button>
         </p>
      </div>
   );
}

export default GameOver;
