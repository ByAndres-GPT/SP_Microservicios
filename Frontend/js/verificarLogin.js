const currentPath = location.pathname;
const rutasAdmin = [
  "/informacion-admin.html",
  "/gestion-salas-admin.html",
  "/solicitudes-admin.html",
  "/historial-admin.html",
  "/gestion-usuarios-admin.html",
  "/detalles-sala-admin.html",
];
const rutasUser = [
  "/informacion-user.html",
  "/estado-reservacion-user.html",
  "/reserva-salas-user.html",
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
    location.replace("/informacion-admin.html");
  }
  if (!esAdmin.esAdmin && !rutasUser.includes(currentPath)) {
    location.replace("/informacion-user.html");
  }
}
verificarLogin();

async function verificarAdministrador(id) {
  const res = await fetch(`${url1}/users/${id}/es-administrador`);

  const json = await res.json();

  return json;
}

function cerrarSesion() {
  localStorage.clear();
  sessionStorage.clear();
  location.replace("/index.html");
}
