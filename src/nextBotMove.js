// Utility function to check if a player has won
function checkWinner(board, player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition => condition.every(index => board[index] === player));
}

// Minimax algorithm with Alpha-Beta pruning
function minimax(board, depth, isMaximizing, alpha, beta) {
    if (checkWinner(board, 'O')) return 1;  // Bot wins
    if (checkWinner(board, 'X')) return -1; // Player wins
    if (!board.includes(null)) return 0;  // Draw

    let bestMove = null;
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) { // Check for null instead of 'null'
            let newBoard = [...board]; // Clone board
            newBoard[i] = isMaximizing ? 'O' : 'X';
            let score = minimax(newBoard, depth + 1, !isMaximizing, alpha, beta);

            if (isMaximizing) {
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                alpha = Math.max(alpha, bestScore);
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                beta = Math.min(beta, bestScore);
            }

            if (beta <= alpha) break; // Alpha-beta pruning
        }
    }

    return depth === 0 ? bestMove : bestScore;
}

// Function to get the bot's best move
export function getBotMove(board) {
    return minimax([...board], 0, true, -Infinity, Infinity);
}