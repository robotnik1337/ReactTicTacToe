import { Turn } from '../App';

interface LogProps {
   gameLog: Turn[];
}

function Log({ gameLog }: LogProps) {
   return (
      <ol id="log">
         {gameLog.map((turn) => (
            <li key={`${turn.square.row}${turn.square.column}`}>
               {turn.player} selected {turn.square.row}, {turn.square.column}.
            </li>
         ))}
      </ol>
   );
}

export default Log;
