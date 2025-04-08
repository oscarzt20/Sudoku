document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar el envío tradicional del formulario

  // Se obtienen los datos del formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Se envían los datos vía POST al endpoint PHP encargado del login
  const response = await fetch("../php/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  });

  const result = await response.json();
  const messageContainer = document.getElementById("messageContainer");
  
  // Limpiar mensajes previos
  messageContainer.innerHTML = "";

  // Crear y mostrar el mensaje
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(result.status === "Successful" ? "success" : "error");
  messageDiv.textContent = result.message;
  messageContainer.appendChild(messageDiv);

  // Si el login es exitoso, esperar 2 segundos y redirigir a la partida
  if (result.status === "Successful") {
    setTimeout(() => {
      window.location.href = "../pages/partidaSudoku.html";
    }, 1000);
  }
});
