<?php
header('Content-Type: application/json');
// Se incluye la conexión a la BD
include "./dbConnection.php";

// Recoger datos del formulario y sanitizarlos
$username = isset($_POST['username']) ? trim($_POST['username']) : "";
$email = isset($_POST['email']) ? trim($_POST['email']) : "";
$password = isset($_POST['password']) ? trim($_POST['password']) : "";
$confirmPassword = isset($_POST['confirm-password']) ? trim($_POST['confirm-password']) : "";

$errores = [];

// Validaciones
if (empty($username)) {
    $errores[] = 'El nombre de usuario es obligatorio.';
}
if (empty($email)) {
    $errores[] = 'El correo electrónico es obligatorio.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'El formato del correo electrónico no es válido.';
}
if (empty($password)) {
    $errores[] = 'La contraseña es obligatoria.';
} elseif (strlen($password) < 8) {
    $errores[] = 'La contraseña debe tener al menos 8 caracteres.';
}
if ($password !== $confirmPassword) {
    $errores[] = 'Las contraseñas no coinciden.';
}

// Verificar si el correo ya existe en la tabla users
if (empty($errores)) {
    $sql_check_email = "SELECT COUNT(*) as count FROM users WHERE email = ?";
    $stmt = $connection->prepare($sql_check_email);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row['count'] > 0) {
        $errores[] = 'El correo electrónico ya está registrado.';
    }
}

// Si existen errores, se devuelve la respuesta en JSON
if (!empty($errores)) {
    echo json_encode(["status" => "Failed", "message" => implode(" ", $errores)]);
    $connection->close();
    exit;
}

// Si no hay errores, proceder con el registro
$contrasenaEncriptada = password_hash($password, PASSWORD_DEFAULT);

$sql_insert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $connection->prepare($sql_insert);
$stmt->bind_param("sss", $username, $email, $contrasenaEncriptada);

if ($stmt->execute()) {
    echo json_encode(["status" => "Successful", "message" => "Cuenta creada exitosamente."]);
} else {
    echo json_encode(["status" => "Failed", "message" => "Error al crear la cuenta: " . $stmt->error]);
}

$connection->close();
?>
