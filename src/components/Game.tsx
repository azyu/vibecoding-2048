
'use client';

import { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Header from './Header';

export interface TileData {
  id: string;
  value: number;
  x: number;
  y: number;
}

const Game = () => {
  const [board, setBoard] = useState<TileData[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [idCounter, setIdCounter] = useState(0);

  const initializeBoard = useCallback(() => {
    const newBoard: TileData[][] = Array(4).fill(0).map((_, y) => Array(4).fill(0).map((_, x) => ({ id: `tile-${y}-${x}`, value: 0, x, y })));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }, []);

  const addRandomTile = (currentBoard: TileData[][]) => {
    const emptyTiles: { r: number; c: number }[] = [];
    currentBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.value === 0) {
          emptyTiles.push({ r, c });
        }
      });
    });

    if (emptyTiles.length > 0) {
      const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      currentBoard[r][c] = { id: `tile-${Date.now()}-${Math.random()}`, value: Math.random() < 0.9 ? 2 : 4, x: c, y: r };
    }
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    let moved = false;
    let currentScore = score;
    const newBoard: TileData[][] = JSON.parse(JSON.stringify(board));

    const slideTiles = (row: TileData[]) => {
      const filteredRow = row.filter(tile => tile.value !== 0);
      const newRow: TileData[] = [];
      for (let i = 0; i < filteredRow.length; i++) {
        newRow.push(filteredRow[i]);
      }
      for (let i = newRow.length; i < 4; i++) {
        newRow.push({ id: `empty-${i}`, value: 0, x: 0, y: 0 }); // Placeholder for empty cells
      }
      return newRow;
    };

    const combineTiles = (row: TileData[]) => {
      for (let i = 0; i < 3; i++) {
        if (row[i].value !== 0 && row[i].value === row[i + 1].value) {
          row[i].value *= 2;
          currentScore += row[i].value;
          row[i + 1].value = 0;
          row[i + 1].id = null; // Set id to null for merged tile
          moved = true;
        }
      }
      return row;
    };

    const move = (key: string) => {
      let boardChanged = false;
      let tempBoard: TileData[][] = JSON.parse(JSON.stringify(newBoard));

      if (key === 'ArrowLeft') {
        for (let r = 0; r < 4; r++) {
          let row = tempBoard[r];
          let originalRow = JSON.parse(JSON.stringify(row));
          row = slideTiles(row);
          row = combineTiles(row);
          row = slideTiles(row);
          if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
            boardChanged = true;
          }
          tempBoard[r] = row;
        }
      } else if (key === 'ArrowRight') {
        for (let r = 0; r < 4; r++) {
          let row = tempBoard[r].reverse();
          let originalRow = JSON.parse(JSON.stringify(row));
          row = slideTiles(row);
          row = combineTiles(row);
          row = slideTiles(row);
          if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
            boardChanged = true;
          }
          tempBoard[r] = row.reverse();
        }
      } else if (key === 'ArrowUp') {
        for (let c = 0; c < 4; c++) {
          let col: TileData[] = [];
          for (let r = 0; r < 4; r++) col.push(tempBoard[r][c]);
          let originalCol = JSON.parse(JSON.stringify(col));
          col = slideTiles(col);
          col = combineTiles(col);
          col = slideTiles(col);
          if (JSON.stringify(originalCol) !== JSON.stringify(col)) {
            boardChanged = true;
          }
          for (let r = 0; r < 4; r++) tempBoard[r][c] = col[r];
        }
      } else if (key === 'ArrowDown') {
        for (let c = 0; c < 4; c++) {
          let col: TileData[] = [];
          for (let r = 0; r < 4; r++) col.push(tempBoard[r][c]);
          col.reverse(); // Reverse for down movement
          let originalCol = JSON.parse(JSON.stringify(col));
          col = slideTiles(col);
          col = combineTiles(col);
          col = slideTiles(col);
          if (JSON.stringify(originalCol) !== JSON.stringify(col)) {
            boardChanged = true;
          }
          col.reverse(); // Reverse back to original order
          for (let r = 0; r < 4; r++) tempBoard[r][c] = col[r];
        }
      }

      if (boardChanged) {
        // Update x, y coordinates for animation
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            tempBoard[r][c].x = c;
            tempBoard[r][c].y = r;
          }
        }
        setBoard(tempBoard);
        setScore(currentScore);
        addRandomTile(tempBoard);
        if (checkGameOver(tempBoard)) {
          setGameOver(true);
        }
      }
    };

    const checkGameOver = (currentBoard: TileData[][]) => {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (currentBoard[r][c].value === 0) return false; // Empty tile exists
          if (r < 3 && currentBoard[r][c].value === currentBoard[r + 1][c].value) return false; // Can merge vertically
          if (c < 3 && currentBoard[r][c].value === currentBoard[r][c + 1].value) return false; // Can merge horizontally
        }
      }
      return true; // No moves left
    };

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        move(e.key);
        break;
      default:
        return;
    }
  }, [board, score, gameOver, addRandomTile]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center max-w-2xl">
      <Header score={score} onNewGame={initializeBoard} />
      <Board board={board.flat().filter(tile => tile.value !== 0)} />
      {gameOver && <div className="mt-4 text-xl font-bold text-red-500">Game Over!</div>}
    </div>
  );
};

export default Game;
