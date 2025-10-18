const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "green";
let gameOver = false;
let cells = [];


for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
}
function handleClick(i) {
    if (gameOver) return;
    if (cells[i].classList.contains("green") || cells[i].classList.contains("red")) return;
    cells[i].classList.add(currentPlayer);
    if (checkWin(currentPlayer)) {
        message.textContent = (currentPlayer === "green" ? "Player 1 (Green)" : "Player 2 (Red)") + " Wins!";
        gameOver = true;
        return;
    }
    if ([...cells].every(c => c.classList.contains("green") || c.classList.contains("red"))) {
        message.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }
    currentPlayer = currentPlayer === "green" ? "red" : "green";
    message.textContent = currentPlayer === "green" ? "Player 1 (Green) Turn" : "Player 2 (Red) Turn";
}
function checkWin(color) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(([a, b, c]) =>
        cells[a].classList.contains(color) &&
        cells[b].classList.contains(color) &&
        cells[c].classList.contains(color)
    );
}
function restart() {
    cells.forEach(cell => cell.className = "cell");
    currentPlayer = "green";
    gameOver = false;
    message.textContent = "Player 1 (Green) Turn";
}