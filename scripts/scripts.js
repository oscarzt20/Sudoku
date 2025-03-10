// Variable que representa la tabla del sudoku
let sudokuBoard = document.getElementById("sudokuBoard");
let clearButton = document.getElementById("clearBoard");

// Matriz que contiene los valores iniciales del sudoku
const defaultBoard = [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];

// Función para crear la tabla del sudoku
function createBoardPage()
{
    // Se limpian los datos
    sudokuBoard.innerHTML = "";

    // for que crea cada celda en la tabla del sudoku
    // Se itera sobre las filas primero
    for(let i = 0; i < 9; i++)
    {
        // Se insertan las filas
        const row = sudokuBoard.insertRow();

        // Se iteran las columnas
        for(let j = 0; j < 9; j++)
        {
            // Se añaden celdas a la tabla y se le da un estilo a la celda
            const cell = row.insertCell(j);
            cell.style.border = '1px solid black';

            // Se crean los input y se le da estilo
            const input = document.createElement("input");
            input.style.width = "50px";
            input.style.height = "50px";
            input.style.textAlign = "center";

            // Se le van asignando los valores de nuestra matriz
            input.value = defaultBoard[i][j] === 0 ? "" : defaultBoard[i][j];
            // input.disabled = defaultBoard[i][j] === 0 ? false : true;
            input.disabled = defaultBoard[i][j] !== 0;

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

// Se llama a la función
createBoardPage();
clearButton.addEventListener("click", clearBoard);