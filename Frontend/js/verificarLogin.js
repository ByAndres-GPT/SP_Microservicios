const currentPath = location.pathname;
const rutasAdmin = [
  "/informacion-admin",
  "/gestion-salas-admin",
  "/solicitudes-admin",
  "/historial-admin",
  "/gestion-usuarios-admin",
  "/detalles-sala-admin",
];
const rutasUser = [
  "/informacion-user",
  "/estado-reservacion-user",
  "/reserva-salas-user",
];
console.log(currentPath);
async function verificarLogin() {
  const id = sessionStorage.getItem("ID_USER");

  if (!id || id === "" || id === undefined) {
    console.log("no user");
    //location.replace("index.html");
    return;
  } else {
    console.log("hay usuario");
  }

  const esAdmin = await verificarAdministrador(Number(id));

  if (esAdmin.esAdmin && !rutasAdmin.includes(currentPath)) {
    location.replace("/informacion-admin");
  }
  if (!esAdmin.esAdmin && !rutasUser.includes(currentPath)) {
    location.replace("/informacion-user");
  }
}
verificarLogin();

async function verificarAdministrador(id) {
  const res = await fetch(`${url}/users/${id}/es-administrador`);

  const json = await res.json();

  return json;
}

function cerrarSesion() {
  localStorage.clear();
  sessionStorage.clear();
  location.replace("/index.html");
}
