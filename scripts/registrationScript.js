document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar el envío tradicional del formulario

  // Recoger datos del formulario
  const username = document.getElementById("username").value;
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirm-password").value;

  // Enviar datos vía POST al endpoint PHP encargado del registro
  const response = await fetch("../php/registerAcc.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirm-password=${encodeURIComponent(confirm)}`
  });

  const result = await response.json();
  const messageContainer = document.getElementById("messageContainer");
  
  // Limpiar mensajes previos
  messageContainer.innerHTML = "";

  // Crear elemento para el mensaje
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(result.status === "Successful" ? "success" : "error");
  messageDiv.textContent = result.message;
  messageContainer.appendChild(messageDiv);

  // Si el registro fue exitoso, redirigir a la página de login después de 2 segundos
  if (result.status === "Successful") {
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }
});
