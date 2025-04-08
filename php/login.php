<?php
session_start();
include "dbConnection.php";

function login($email, $password) {
    global $connection;

    $stmt = $connection->prepare("SELECT ID_User, name, password FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user["password"])) {
            // Guardamos los datos del usuario en sesión
            $_SESSION["IDUser"] = $user["ID_User"];
            $_SESSION["Name"] = $user["name"];

            return ["status" => "Successful", "message" => "Login exitoso"];
        }
    }

    return ["status" => "Failed", "message" => "Credenciales inválidas"];
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"]) && $_POST["action"] === "login") {
    $email = trim($_POST["email"] ?? "");
    $password = trim($_POST["password"] ?? "");

    echo json_encode(login($email, $password));
}
?>
