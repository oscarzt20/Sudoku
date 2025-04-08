function tablaAJson() {
    const tabla = document.getElementById('sudokuBoard');
    const filas = tabla.getElementsByTagName('tr');
    const tablero = [];

    for (let i = 0; i < filas.length; i++) {
        const celdasFila = filas[i].getElementsByTagName('td');
        const fila = [];
        for (let j = 0; j < celdasFila.length; j++) {
            const input = celdasFila[j].querySelector('input');
            const valor = input && input.value ? parseInt(input.value) : 0;
            fila.push(valor);
        }
        tablero.push(fila);
    }
    return JSON.stringify(tablero);
}

function llenarTablero(board) {
    const tabla = document.getElementById('sudokuBoard');
    tabla.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const celda = document.createElement('td');
            const input = document.createElement('input');
            input.maxLength = 1;
            input.style.width = "50px";
            input.style.height = "50px";
            input.style.textAlign = "center";

            const valor = board[i][j];
            if (valor !== 0 && valor !== null) {
                input.value = valor;
                input.disabled = true;
            } else {
                input.value = '';
                input.disabled = false;
                input.addEventListener("input", function () {
                    this.value = this.value.replace(/[^1-9]/g, '');
                });
            }

            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
}

function saveGameState() {
    const id = prompt("Escribe el ID de la partida a guardar (deja vacío para nueva partida):");
    const tableroJson = tablaAJson();
    const action = id ? 'update' : 'save';

    fetch("../php/SudokuState.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=${action}&board=${encodeURIComponent(tableroJson)}${id ? '&id=' + id : ''}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
            } else {
                alert("❌ Error: " + data.error);
            }
        })
        .catch(() => alert("❌ Error de red al guardar."));
}

function loadGameState() {
    const id = prompt("Escribe el ID de la partida que deseas cargar:");
    if (!id) return;

    fetch("../php/SudokuState.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=load&id=${id}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                llenarTablero(data.board);
                alert("✅ Partida cargada correctamente.");
            } else {
                alert("❌ Error: " + data.error);
            }
        })
        .catch(() => alert("❌ Error de red al cargar."));
}

function nuevaPartida() {
    const dificultad = prompt("Selecciona la dificultad: Fácil, Medio o Difícil").toLowerCase();
    let casillasVacias = { "fácil": 30, "medio": 40, "difícil": 50 }[dificultad];
    if (casillasVacias === undefined) {
        alert("❌ Opción inválida");
        return;
    }
    generarTablero(casillasVacias);
}

function generarTablero(casillasVacias) {
    const solucion = generarSudokuResuelto();
    const tablero = ocultarCasillas(solucion, casillasVacias);
    const tabla = document.getElementById('sudokuBoard');
    tabla.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const celda = document.createElement('td');
            const input = document.createElement('input');
            input.maxLength = 1;
            input.style.width = "50px";
            input.style.height = "50px";
            input.style.textAlign = "center";

            if (tablero[i][j] !== 0) {
                input.value = tablero[i][j];
                input.disabled = true;
            } else {
                input.addEventListener("input", function () {
                    this.value = this.value.replace(/[^1-9]/g, '');
                });
            }

            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
}

function generarSudokuResuelto() {
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
    let nuevo = tablero.map(row => row.slice());
    let ocultadas = 0;
    while (ocultadas < cantidad) {
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        if (nuevo[i][j] !== 0) {
            nuevo[i][j] = 0;
            ocultadas++;
        }
    }
    return nuevo;
}

document.getElementById("partida").addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "nuevaPartida") nuevaPartida();
    else if (val === "guardarPartida") saveGameState();
    else if (val === "cargarPartida") loadGameState();
});
