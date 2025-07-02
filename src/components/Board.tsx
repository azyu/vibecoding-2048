
import Tile from './Tile';
import { TileData } from './Game';

interface BoardProps {
  board: TileData[];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="relative w-[704px] h-[704px] p-4 rounded-lg bg-gray-300">
      {board.filter(tile => tile.id !== null).map(tile => (
        <Tile key={tile.id} value={tile.value} x={tile.x} y={tile.y} />
      ))}
    </div>
  );
};

export default Board;
