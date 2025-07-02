
import { useState, useEffect } from 'react';

interface TileProps {
  value: number;
}

const Tile: React.FC<TileProps> = ({ value }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (value !== 0) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 200); // 애니메이션 지속 시간
      return () => clearTimeout(timer);
    }
  }, [value]);

  const tileClasses = `
    w-40 h-40 flex items-center justify-center rounded-md text-5xl font-bold
    transition-all duration-100 ease-in-out transform
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
  `;

  return (
    <div className={tileClasses}>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;
