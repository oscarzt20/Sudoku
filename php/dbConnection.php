<?php
// Variables necesarias para la BD
$host     = "localhost";
$user     = "root";
$password = "";
$database = "logindb";

// Crear la conexión a la base de datos
$connection = new mysqli($host, $user, $password, $database);

// Verificar si hay error en la conexión
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>
