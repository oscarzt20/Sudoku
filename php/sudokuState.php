<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
include "./dbConnection.php";

if (!isset($_SESSION['IDUser'])) {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado.']);
    exit;
}

$userId = $_SESSION['IDUser'];

function saveState($conn, $userId, $boardData)
{
    try {
        if (!$boardData) {
            return ['success' => false, 'error' => 'No se recibieron datos del tablero.'];
        }

        $query = "INSERT INTO sudoku_boards (IDUser, board_data) VALUES (?, ?)";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            return ['success' => false, 'error' => 'Error al preparar la consulta: ' . $conn->error];
        }

        $boardJson = json_encode($boardData);
        $stmt->bind_param("is", $userId, $boardJson);

        if (!$stmt->execute()) {
            return ['success' => false, 'error' => 'Error al guardar el tablero: ' . $stmt->error];
        }

        $stmt->close();
        return ['success' => true, 'message' => 'Tablero guardado exitosamente.'];
    } catch (Exception $e) {
        return ['success' => false, 'error' => 'Error interno del servidor: ' . $e->getMessage()];
    }
}

function loadState($conn, $userId)
{
    try {
        $query = "SELECT board_data FROM sudoku_boards WHERE IDUser = ?";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            return ['success' => false, 'error' => 'Error al preparar la consulta: ' . $conn->error];
        }

        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $boardData = null;
        $stmt->bind_result($boardData);

        if ($stmt->fetch()) {
            $stmt->close();
            return ['success' => true, 'board' => $boardData ? json_decode($boardData, true) : null];
        } else {
            $stmt->close();
            return ['success' => false, 'error' => 'No se encontró ningún tablero guardado.'];
        }
    } catch (Exception $e) {
        return ['success' => false, 'error' => 'Error interno del servidor: ' . $e->getMessage()];
    }
}

// Manejo de la petición
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'save') {
        $result = saveState($conn, $userId, $_POST['board']);
        echo json_encode($result);
    } elseif ($_POST['action'] === 'load') {
        $result = loadState($conn, $userId);
        echo json_encode($result);
    } else {
        echo json_encode(['success' => false, 'error' => 'Acción no válida.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Petición no válida.']);
}
$conn->close();
?>