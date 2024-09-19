const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return null;
}

function handleClick(event) {
    const cell = event.target;
    if (!gameActive || cell.textContent) return;
    
    cell.textContent = currentPlayer;
    
    const winner = checkWinner();
    if (winner) {
        status.textContent = `Player ${winner} wins!`;
        gameActive = false;
    } else if ([...cells].every(cell => cell.textContent)) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
