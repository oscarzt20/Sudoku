let sudokuBoard = document.getElementById("sudokuBoard");
let clearButton = document.getElementById("clearBoard");

// Matriz que contiene los valores iniciales del sudoku
const defaultBoard = [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];

// Función para crear la tabla del sudoku
function createBoardPage()
{
    sudokuBoard.innerHTML = "";

    for(let i = 0; i < 9; i++)
    {
        const row = sudokuBoard.insertRow();

        for(let j = 0; j < 9; j++)
        {
            const cell = row.insertCell(j);
            cell.style.border = '1px solid black';

            const input = document.createElement("input");
            input.style.width = "50px";
            input.style.height = "50px";
            input.style.textAlign = "center";
            input.maxLength = 1;

            input.value = defaultBoard[i][j] === 0 ? "" : defaultBoard[i][j];
            input.disabled = defaultBoard[i][j] !== 0;

            if (!input.disabled) {
                input.addEventListener("input", function () {
                    this.value = this.value.replace(/[^1-9]/g, '');
                });
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuBoard.appendChild(row);
    }
}

function clearBoard()
{
    let input = Array.from(document.getElementsByTagName("input"));

    for(let i = 0; i < input.length; i++)
    {
        if(!input[i].disabled)
        {
            input[i].value = "";
        }
    }
}

function validateBoard() {
    let board = Array.from(document.querySelectorAll("#sudokuBoard input"))
        .map(input => +input.value || 0);
    
    if (board.includes(0)) {
        return alert("El Sudoku no está completo");
    }

    const isValidSet = nums => {
        let filtered = nums.filter(n => n !== 0);
        return new Set(filtered).size === filtered.length;
    };

    for (let i = 0; i < 9; i++) {
        let row = [], col = [];
        for (let j = 0; j < 9; j++) {
            row.push(board[i * 9 + j]);
            col.push(board[j * 9 + i]);
        }
        if (!isValidSet(row) || !isValidSet(col)) {
            return alert("El Sudoku no es válido");
        }
    }

    for (let i = 0; i < 9; i++) {
        let box = [];
        let startRow = Math.floor(i / 3) * 3;
        let startCol = (i % 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                box.push(board[(startRow + r) * 9 + (startCol + c)]);
            }
        }
        if (!isValidSet(box)) {
            return alert("El Sudoku no es válido");
        }
    }

    alert("El Sudoku es válido y completo");
}

createBoardPage();
clearButton.addEventListener("click", clearBoard);
validateButton.addEventListener("click", validateBoard);
