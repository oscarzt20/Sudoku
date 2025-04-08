<?php
// Mostrar errores en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "127.0.0.1";
$user = "root";
$password = "";
$database = "logindb";

// Crear conexión
$connection = new mysqli($host, $user, $password, $database);

// Verificar conexión
if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "Failed", "message" => "Error en la conexión: " . $connection->connect_error]);
    exit;
}
?>
