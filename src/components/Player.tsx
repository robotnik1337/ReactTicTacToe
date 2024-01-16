import { useState } from 'react';

interface PlayerProps {
   startingName: string;
   symbol: string;
   isActive: boolean;
   onNameChanged: (playerSymbol: string, newPlayerName: string) => void;
}

function Player({
   startingName,
   symbol,
   isActive,
   onNameChanged,
}: PlayerProps) {
   const [playerName, setPlayerName] = useState(startingName);
   const [editing, setEditing] = useState(false);

   function handleEditing() {
      setEditing((editing) => !editing);
   }

   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setPlayerName(event.target.value);
      if (editing) onNameChanged(symbol, playerName);
   }

   return (
      <li className={isActive ? 'active' : undefined}>
         <span className="player">
            {editing ? (
               <input
                  type="text"
                  value={playerName}
                  onChange={handleChange}
                  required
               />
            ) : (
               <span className="player-name">{playerName}</span>
            )}
            <span className="player-symbol">{symbol}</span>
         </span>
         <button onClick={handleEditing}>{editing ? 'Save' : 'Edit'}</button>
      </li>
   );
}

export default Player;
