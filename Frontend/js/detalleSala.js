async function mostrarInformacion() {
  let urll = new URLSearchParams(location.search);
  var id = urll.get("id-sala");

  try {
    const response = await fetch(`${url3}/salas/sala/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtene la sala");
    }

    const sala = await response.json();
    document.getElementById("n-sala").textContent = sala.sala.NOMBRE;
    document.getElementById("d-sala").textContent = sala.sala.DESCRIPCION;
    document.getElementById("e-sala").textContent = sala.sala.ESTADO;
  } catch (error) {
    console.log("error");
  }

  try {
    const response = await fetch(`${url}/entradasYsalidas/enSala/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtene la sala");
    }

    const usuarios = await response.json();

    usuarios.datos.forEach((usuario) => {
      let nuevo =
        '<tr>  <td id="id_usuario">' +
        usuario.ID_USUARIO +
        '</td><td id="nombre">' +
        usuario.NOMBRE +
        '</td><td id="nombre">' +
        usuario.FECHA_ENTRADA +
        '</td></tr>';

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log("error");
  }
}
mostrarInformacion();
