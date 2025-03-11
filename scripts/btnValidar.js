document.getElementById("nuevaPartida").addEventListener("click", nuevaPartida);
function nuevaPartida() {
    const dificultad = prompt("Selecciona la dificultad: Fácil, Medio o Difícil").toLowerCase();
    let casillasVacias;

    switch (dificultad) {
        case "fácil":
            casillasVacias = 31;
            break;
        case "medio":
            casillasVacias = 40;
            break;
        case "difícil":
            casillasVacias = 45;
            break;
        default:
            alert("Opción inválida. Selecciona Fácil, Medio o Difícil.");
            return;
    }

    generarTablero(casillasVacias);
}

function generarTablero(casillasVacias) {
    let sudokuBoard = document.getElementById("sudokuBoard");
    sudokuBoard.innerHTML = ""; // Limpia el tablero

    let solucionCompleta = generarSudokuResuelto(); // Genera un tablero de Sudoku resuelto
    let tableroConHuecos = ocultarCasillas(solucionCompleta, casillasVacias);

    // Genera la tabla visual
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;

            if (tableroConHuecos[i][j] !== 0) {
                input.value = tableroConHuecos[i][j];
                input.disabled = true;
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuBoard.appendChild(row);
    }
}

function generarSudokuResuelto() {
    // Genera un tablero resuelto básico (para simplicidad, este es un tablero fijo, pero se puede mejorar con un generador aleatorio)
    return [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
}

function ocultarCasillas(tablero, cantidad) {
    let nuevoTablero = tablero.map(row => row.slice());

    let casillasOcultas = 0;
    while (casillasOcultas < cantidad) {
        let fila = Math.floor(Math.random() * 9);
        let columna = Math.floor(Math.random() * 9);

        if (nuevoTablero[fila][columna] !== 0) {
            nuevoTablero[fila][columna] = 0;
            casillasOcultas++;
        }
    }

    return nuevoTablero;
}
