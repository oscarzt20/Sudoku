<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
include "dbConnection.php";

if (!isset($_SESSION['IDUser'])) {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado.']);
    exit;
}

$userId = $_SESSION['IDUser'];
$action = $_POST['action'] ?? '';
$boardData = $_POST['board'] ?? '';
$gameId = $_POST['id'] ?? null;

if ($action === 'save') {
    $stmt = $connection->prepare("INSERT INTO sudoku_boards (IDUser, board_data) VALUES (?, ?)");
    $stmt->bind_param("is", $userId, $boardData);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => '✅ Partida guardada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al guardar la partida: ' . $stmt->error]);
    }
    $stmt->close();
} elseif ($action === 'load') {
    $stmt = $connection->prepare("SELECT board_data FROM sudoku_boards WHERE IDSudoku = ? AND IDUser = ?");
    $stmt->bind_param("ii", $gameId, $userId);
    $stmt->execute();
    $stmt->bind_result($board);
    if ($stmt->fetch()) {
        echo json_encode(['success' => true, 'board' => json_decode($board, true)]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No se encontró la partida.']);
    }
    $stmt->close();
} elseif ($action === 'update') {
    $stmt = $connection->prepare("UPDATE sudoku_boards SET board_data = ? WHERE IDSudoku = ? AND IDUser = ?");
    $stmt->bind_param("sii", $boardData, $gameId, $userId);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => '✅ Partida actualizada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al actualizar la partida: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Acción no válida.']);
}

$connection->close();
?>
