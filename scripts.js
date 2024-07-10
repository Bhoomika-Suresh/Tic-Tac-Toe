document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('[data-square]');
    const grid = document.getElementById('board');
    const statusDisplay = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-btn');
    const WIN_CONDITIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill(null);

    function handleSquareClick(e) {
        const square = e.target;
        const squareIndex = Array.from(squares).indexOf(square);
        if (gameState[squareIndex] !== null || !gameActive) {
            return;
        }

        placeMark(square, currentPlayer);
        gameState[squareIndex] = currentPlayer;

        if (checkWin(currentPlayer)) {
            highlightWinningCombination(currentPlayer);
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            switchPlayer();
            updateStatusDisplay();
        }
    }

    function placeMark(square, player) {
        square.textContent = player;
        square.classList.add(`player-${player.toLowerCase()}`);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function updateStatusDisplay() {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin(player) {
        return WIN_CONDITIONS.some(condition => {
            return condition.every(index => {
                return squares[index].classList.contains(`player-${player.toLowerCase()}`);
            });
        });
    }

    function highlightWinningCombination(player) {
        WIN_CONDITIONS.forEach(condition => {
            if (condition.every(index => squares[index].classList.contains(`player-${player.toLowerCase()}`))) {
                condition.forEach(index => {
                    squares[index].classList.add('highlight');
                });
            }
        });
    }

    function isDraw() {
        return gameState.every(square => square !== null);
    }

    function endGame(draw) {
        if (draw) {
            statusDisplay.textContent = 'Draw!';
        } else {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        }
        gameActive = false;
    }

    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = Array(9).fill(null);
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('player-x');
            square.classList.remove('player-o');
            square.classList.remove('highlight');
        });
        updateStatusDisplay();
    }

    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });

    resetButton.addEventListener('click', resetGame);

    updateStatusDisplay();
});
