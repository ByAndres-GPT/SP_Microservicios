async function mostrarInformacion() {
  const id = sessionStorage.getItem("ID_USER");
  try {
    const response = await fetch(`${url1}/users/user/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    document.getElementById("m-barra").textContent =
      usuario.usuario[0].NOMBRE + " " + usuario.usuario[0].APELLIDO;
  } catch (error) {
    console.log("error");
  }
}
mostrarInformacion();
