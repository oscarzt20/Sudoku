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

const fs = require('fs');
const path = require('path');

const saveFilePath = path.join(__dirname, 'sudokuProgress.json');

function tablaAJson() {
    const tabla = document.getElementById('sudokuBoard');
    const filas = tabla.getElementsByTagName('tr');
    const tablero = [];

    for (let i = 0; i < filas.length; i++) {
        const celdasFila = filas[i].getElementsByTagName('td');
        const fila = [];
        for (let j = 0; j < celdasFila.length; j++) {
            const input = celdasFila[j].querySelector('input');
            const valor = input ? parseInt(input.value) : null;
            fila.push(valor);
        }
        tablero.push(fila);
    }
    return JSON.stringify(tablero);
}

// Function to save the current game state to a JSON file
function saveGameState() {
    const tableroJson = tablaAJson();

    fetch('tu_script_php.php', { // Reemplaza 'tu_script_php.php' con el nombre de tu archivo PHP
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Importante para enviar datos como formulario
        },
        body: 'action=save&board=' + encodeURIComponent(tableroJson) // Enviar la acción y el tablero JSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Tablero guardado con éxito:', data.message);
                // Muestra un mensaje al usuario (por ejemplo, actualiza la interfaz)
            } else {
                console.error('Error al guardar el tablero:', data.error);
                // Muestra un mensaje de error al usuario
            }
        })
        .catch(error => console.error('Error de red:', error));
}

// Function to load the game state from the JSON file
function loadGameState() {
    fetch('tu_script_php.php', { // Reemplaza 'tu_script_php.php' con el nombre de tu archivo PHP
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Importante para enviar datos como formulario
        },
        body: 'action=load' // Enviar solo la acción 'load'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Tablero cargado:', data.board);
                // Actualiza la interfaz con data.board (por ejemplo, llena los inputs de la tabla)
                llenarTablero(data.board); // Llamar a una función para llenar el tablero
            } else {
                console.error('Error al cargar el tablero:', data.error);
                // Muestra un mensaje de error al usuario
            }
        })
        .catch(error => console.error('Error de red:', error));
}

function llenarTablero(board) {
    const tabla = document.getElementById('sudokuBoard');
    const filas = tabla.getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const celdasFila = filas[i].getElementsByTagName('td');
        for (let j = 0; j < celdasFila.length; j++) {
            const input = celdasFila[j].querySelector('input');
            if (input) {
                input.value = board[i][j] !== null ? board[i][j] : '';
            }
        }
    }
}

// Example usage
const exampleBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

const selectorPartida = document.getElementById("partida");

selectorPartida.addEventListener("change", (event) => {
    const valorSeleccionado = event.target.value;

    if (valorSeleccionado === "nuevaPartida")
        nuevaPartida();
    else if (valorSeleccionado === "guardarPartida")
        saveGameState();
    else if (valorSeleccionado === "cargarPartida")
        loadGameState();
});