const currentPath = location.pathname;
console.log(currentPath);
const rutasAdmin = [
  "/SP_Microservicios/Frontend/informacion-admin.html",
  "/SP_Microservicios/Frontend/gestion-salas-admin.html",
  "/SP_Microservicios/Frontend/solicitudes-admin.html",
  "/SP_Microservicios/Frontend/historial-admin.html",
  "/SP_Microservicios/Frontend/gestion-usuarios-admin.html",
  "/SP_Microservicios/Frontend/detalles-sala-admin.html",
];
const rutasUser = [
  "/SP_Microservicios/Frontend/informacion-user.html",
  "/SP_Microservicios/Frontend/estado-reservacion-user.html",
  "/SP_Microservicios/Frontend/reserva-salas-user.html",
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
    location.replace("/SP_Microservicios/Frontend/informacion-admin.html");
  }
  if (!esAdmin.esAdmin && !rutasUser.includes(currentPath)) {
    location.replace("/SP_Microservicios/Frontend/informacion-user.html");
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
  location.replace("/SP_Microservicios/Frontend/index.html");
}
