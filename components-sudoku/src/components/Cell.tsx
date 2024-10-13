import '../styles/Cell.css';

interface SudokuCellProps {
    value: number | null;
    isSelected: boolean;
    onClick: () => void;
    onChange: (value: string) => void;
}

function Cell({ value, isSelected, onClick, onChange }: SudokuCellProps) {
    return (
        <input
            type="text"
            value={value || ''}
            className={`sudoku-cell ${isSelected ? 'selected' : ''}`}
            maxLength={1}
            onClick={onClick}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default Cell;