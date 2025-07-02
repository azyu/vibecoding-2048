
'use client';

import { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Header from './Header';

const Game = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeBoard = useCallback(() => {
    const newBoard = Array(4).fill(0).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }, []);

  const addRandomTile = (currentBoard: number[][]) => {
    const emptyTiles: { r: number; c: number }[] = [];
    currentBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) {
          emptyTiles.push({ r, c });
        }
      });
    });

    if (emptyTiles.length > 0) {
      const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    let moved = false;
    const newBoard = JSON.parse(JSON.stringify(board));
    let currentScore = score;

    const move = (key: string) => {
      let boardChanged = false;

      const slide = (row: number[]) => {
        const newRow = row.filter(val => val !== 0);
        const missing = 4 - newRow.length;
        const zeros = Array(missing).fill(0);
        return zeros.concat(newRow);
      };

      const combine = (row: number[]) => {
        for (let i = 3; i > 0; i--) {
          if (row[i] === row[i - 1] && row[i] !== 0) {
            row[i] *= 2;
            currentScore += row[i];
            row[i - 1] = 0;
            boardChanged = true;
          }
        }
        return row;
      };

      const operateRow = (row: number[]) => {
        let newRow = slide(row);
        newRow = combine(newRow);
        newRow = slide(newRow);
        return newRow;
      };

      if (key === 'ArrowLeft') {
        for (let r = 0; r < 4; r++) {
          const row = newBoard[r];
          const originalRow = [...row];
          const newRow = operateRow(row.reverse()).reverse();
          if (JSON.stringify(originalRow) !== JSON.stringify(newRow)) {
            boardChanged = true;
          }
          newBoard[r] = newRow;
        }
      } else if (key === 'ArrowRight') {
        for (let r = 0; r < 4; r++) {
          const row = newBoard[r];
          const originalRow = [...row];
          const newRow = operateRow(row);
          if (JSON.stringify(originalRow) !== JSON.stringify(newRow)) {
            boardChanged = true;
          }
          newBoard[r] = newRow;
        }
      } else if (key === 'ArrowUp') {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          const originalCol = [...col];
          const newCol = operateRow(col.reverse()).reverse();
          if (JSON.stringify(originalCol) !== JSON.stringify(newCol)) {
            boardChanged = true;
          }
          for (let r = 0; r < 4; r++) {
            newBoard[r][c] = newCol[r];
          }
        }
      } else if (key === 'ArrowDown') {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          const originalCol = [...col];
          const newCol = operateRow(col);
          if (JSON.stringify(originalCol) !== JSON.stringify(newCol)) {
            boardChanged = true;
          }
          for (let r = 0; r < 4; r++) {
            newBoard[r][c] = newCol[r];
          }
        }
      }
      return boardChanged;
    };

    const checkGameOver = (currentBoard: number[][]) => {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (currentBoard[r][c] === 0) return false; // Empty tile exists
          if (r < 3 && currentBoard[r][c] === currentBoard[r + 1][c]) return false; // Can merge vertically
          if (c < 3 && currentBoard[r][c] === currentBoard[r][c + 1]) return false; // Can merge horizontally
        }
      }
      return true; // No moves left
    };

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        moved = move(e.key);
        break;
      default:
        return;
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(currentScore);
      if (checkGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  }, [board, score, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, score, gameOver, handleKeyDown]);

  return (
    <div className="flex flex-col items-center max-w-2xl">
      <Header score={score} onNewGame={initializeBoard} />
      <Board board={board} />
      {gameOver && <div className="mt-4 text-xl font-bold text-red-500">Game Over!</div>}
    </div>
  );
};

export default Game;
