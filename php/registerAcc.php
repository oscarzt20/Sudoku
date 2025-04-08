<?php
// Mostrar errores SOLO en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Encabezado para JSON
header('Content-Type: application/json');

// Incluir conexión a la BD
require_once "dbConnection.php";

// Recoger y limpiar datos del formulario
$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$confirmPassword = trim($_POST['confirm-password'] ?? '');

$errores = [];

// Validaciones
if (empty($username)) $errores[] = "El nombre de usuario es obligatorio.";
if (empty($email)) {
    $errores[] = "El correo electrónico es obligatorio.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "Formato de correo inválido.";
}
if (empty($password)) $errores[] = "La contraseña es obligatoria.";
elseif (strlen($password) < 8) $errores[] = "La contraseña debe tener al menos 8 caracteres.";
if ($password !== $confirmPassword) $errores[] = "Las contraseñas no coinciden.";

// Validar existencia previa del correo
if (empty($errores)) {
    $stmt = $connection->prepare("SELECT COUNT(*) as count FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->fetch_assoc()['count'] > 0) {
        $errores[] = "El correo electrónico ya está registrado.";
    }
}

// Si hay errores, se responde en JSON
if (!empty($errores)) {
    echo json_encode(["status" => "Failed", "message" => implode(" ", $errores)]);
    exit;
}

// Insertar en la base de datos
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $connection->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["status" => "Successful", "message" => "Cuenta creada exitosamente."]);
} else {
    echo json_encode(["status" => "Failed", "message" => "Error al crear la cuenta: " . $stmt->error]);
}

$connection->close();
?>
