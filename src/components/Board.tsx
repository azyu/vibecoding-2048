
import Tile from './Tile';

interface BoardProps {
  board: number[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 rounded-lg bg-gray-300">
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
        ))
      ))}
    </div>
  );
};

export default Board;
