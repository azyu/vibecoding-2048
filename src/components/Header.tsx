
interface HeaderProps {
  score: number;
  onNewGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, onNewGame }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mb-8">
      <h1 className="text-6xl font-bold text-gray-800">2048</h1>
      <div className="flex items-center space-x-6">
        <div className="bg-gray-300 rounded-md p-4 text-2xl font-semibold">
          Score: {score}
        </div>
        <button
          onClick={onNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Header;
