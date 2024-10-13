import React, { useState } from 'react';
import Cell from './Cell';
import '../styles/Board.css';


interface SelectedCell {
    row: number | null;
    col: number | null;
}

function Board() {
    const boardSize = 9;
    const initialBoard: (number | null)[][] = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    const [board, setBoard] = useState<(number | null)[][]>(initialBoard);
    const [selectedCell, setSelectedCell] = useState<SelectedCell>({ row: null, col: null });

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    const handleCellChange = (row: number, col: number, value: string) => {
        if (!/^[1-9]?$/.test(value)) return;

        const newBoard = board.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? parseInt(value) : cell
            )
        );
        setBoard(newBoard);
    };

    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell}
                            isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
