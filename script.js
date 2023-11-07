var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var placesCovered = 0;

function printEndingMessage (endingMessageContent)
{
    let endingMessage = document.getElementById("ending-message");

    alert (endingMessage.innerHTML);

    endingMessage.innerHTML = endingMessageContent;
}

function checkWinner (board)
{
    // alert ('checking ... ');
    // Check rows
    for (let i = 0; i < 3; i++)
    {
        if (board[i][0] != 0 && board[i][0] == board[i][1] && board[i][0] == board[i][2])
        {
            return board[i][0]; // Winning row
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++)
    {
        if (board[0][j] != 0 && board[0][j] == board[1][j] && board[0][j] == board[2][j])
        {            
            return board[0][j]; // Winning column
        }
    }

    // Check diagonalss
    if (board[0][0] != 0 && board[0][0] == board[1][1] && board[0][0] == board[2][2])
    {
        return board[0][0]; // Diagonal from top left to bottom right
    }
    if (board[0][2] != 0 && board[0][2] == board[1][1] && board[0][2] == board[2][0])
    {
        return board[0][2]; // Diagonal from top right to bottom left
    }

    if (placesCovered == 9)
    {
        //printEndingMessage ("Game draw!");
    }

    // No winner
    return 0;
}


document.addEventListener ("DOMContentLoaded", function()
{
    var cells = document.querySelectorAll(".cell");
    var lastMove = "O"; // Initial last move, can be "X" or "O"

    var isGameAlive = true;

    cells.forEach(function(cell) {
        if (isGameAlive == true)
        {
            cell.addEventListener("click", function(event) {
                var clickedCell = event.target;
                var clickedCellId = clickedCell.id;

                let x = parseInt (clickedCellId[0]);
                let y = parseInt (clickedCellId[2]);

                if (board[x][y] == 0)
                { 
                    ++placesCovered;

                    if (lastMove === "X") {
                        clickedCell.textContent = "O"; // Draw "O"
                        lastMove = "O"; // Update last move
                    } else {
                        clickedCell.textContent = "X"; // Draw "X"
                        lastMove = "X"; // Update last move
                    }
        
                    board[x][y] = lastMove == "X" ? 1 : 2;

                    var winner = checkWinner (board);

                    if (winner != 0)
                    {
                        isGameAlive = false;
                        let endingMessage = document.getElementById("ending-message");
                        endingMessage.innerHTML = "Player #" + String (winner) + " has won!";
                        
                        let instruction = document.getElementById("instruction");
                        instruction.innerHTML = "Reload to restart";
                    }
                }
            });
        }
    });
});
