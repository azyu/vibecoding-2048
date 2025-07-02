import { useState, useEffect } from 'react';

interface TileProps {
  value: number;
  x: number;
  y: number;
}

const Tile: React.FC<TileProps> = ({ value, x, y }) => {
  const [isNew, setIsNew] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== 0 && prevValue === 0) { // New tile appearing
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 200);
      return () => clearTimeout(timer);
    } else if (value !== 0 && prevValue !== 0 && value !== prevValue) { // Value changed, likely a merge
      setIsMerged(true);
      const timer = setTimeout(() => setIsMerged(false), 200);
      return () => clearTimeout(timer);
    }
    setPrevValue(value);
  }, [value, prevValue]);

  const tileClasses = `
    absolute w-40 h-40 flex items-center justify-center rounded-md text-5xl font-bold
    transition-all duration-300 ease-in-out
    ${value === 0 ? 'bg-gray-200 text-gray-700' : 'text-white'}
    ${value === 2 ? 'bg-yellow-300' : ''}
    ${value === 4 ? 'bg-yellow-400' : ''}
    ${value === 8 ? 'bg-orange-400' : ''}
    ${value === 16 ? 'bg-orange-500' : ''}
    ${value === 32 ? 'bg-red-400' : ''}
    ${value === 64 ? 'bg-red-500' : ''}
    ${value === 128 ? 'bg-blue-400' : ''}
    ${value === 256 ? 'bg-blue-500' : ''}
    ${value === 512 ? 'bg-purple-400' : ''}
    ${value === 1024 ? 'bg-purple-500' : ''}
    ${value === 2048 ? 'bg-green-500' : ''}
    ${value > 2048 ? 'bg-black' : ''}
    ${isNew ? 'scale-110' : 'scale-100'}
    ${isMerged ? 'scale-125' : 'scale-100'}
  `;

  const tileStyle = {
    transform: `translate(${x * (160 + 16)}px, ${y * (160 + 16)}px)`,
  };

  return (
    <div className={tileClasses} style={tileStyle}>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;