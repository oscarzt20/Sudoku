<?php
// Se incluye la conexión a la BD
include "./dbConnection.php";

// Función para iniciar sesión
function login($email, $password) {
    global $connection;

    // Preparar la consulta
    $selectQuery = $connection->prepare("SELECT name, password FROM users WHERE email = ?");
    $selectQuery->bind_param("s", $email);
    $selectQuery->execute();
    $result = $selectQuery->get_result();

    // Verificar si se encontró el usuario
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Se valida la contraseña usando password_verify
        if (password_verify($password, $user["password"])) {
            return ["status" => "Successful", "message" => "Login exitoso"];
        }
    }

    // En caso de fallo
    return ["status" => "Failed", "message" => "Login fallido"];
}

// Procesar la petición POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"]) && $_POST["action"] === "login") {
    // Se reciben y sanitizan los parámetros
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $password = isset($_POST["password"]) ? trim($_POST["password"]) : "";

    // Se retorna la respuesta en JSON
    echo json_encode(login($email, $password));
}
?>
