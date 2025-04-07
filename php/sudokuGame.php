<?php
// Se incluye la conexión a la BD
include "./dbConnection.php";

// Leer el archivo JSON generado por el script sudokuGameScript
$jsonFilePath = "./sudokuProgress.json";
if (file_exists($jsonFilePath)) {
    $jsonData = file_get_contents($jsonFilePath);
    $sudokuBoard = json_decode($jsonData, true);

    if ($sudokuBoard && is_array($sudokuBoard)) {
        // Preparar la consulta para insertar el tablero en la base de datos
        $query = "INSERT INTO sudoku_boards (board_data) VALUES (?)";
        $stmt = $conn->prepare($query);

        if ($stmt) {
            $boardData = json_encode($sudokuBoard);
            $stmt->bind_param("s", $boardData);

            if ($stmt->execute()) {
                echo "El tablero de Sudoku se ha cargado correctamente en la base de datos.";
            } else {
                echo "Error al insertar el tablero en la base de datos: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error al preparar la consulta: " . $conn->error;
        }
    } else {
        echo "El archivo JSON no contiene un tablero válido.";
    }
} else {
    echo "El archivo JSON no existe.";
}
?>