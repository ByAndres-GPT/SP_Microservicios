var inactividadTimer; // Variable para almacenar el temporizador de inactividad
const id_user = sessionStorage.getItem("ID_USER");
// Función para restablecer el temporizador de inactividad
function restablecerInactividad() {
  if (
    !id_user ||
    id_user === "" ||
    id_user === undefined ||
    id_user === "undefined"
  ) {
    location.replace("index.html");
    return;
  }

  // Borra el temporizador anterior y comienza uno nuevo
  clearTimeout(inactividadTimer);
  inactividadTimer = setTimeout(function () {
    // Borra el localStorage después de 2 minutos de inactividad
    localStorage.clear();
    sessionStorage.clear();
    console.log("El localStorage ha sido borrado debido a la inactividad.");
    alert("La sesión expiró");
    location.replace("index.html");
  }, 15 * 60 * 1000); // 1 minutos en milisegundos
}

// Evento de inactividad para detectar actividad del usuario
document.addEventListener("mousemove", restablecerInactividad);
document.addEventListener("keypress", restablecerInactividad);

// Iniciar el temporizador de inactividad al cargar la página
restablecerInactividad();
