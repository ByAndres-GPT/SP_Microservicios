const inputUsuario = document.querySelector("#idUsuario");
const inputSala = document.querySelector("#idSala");
async function filtro() {
  var ID_USUARIO = inputUsuario.value;
  var ID_SALA = inputSala.value;

  var body = { ID_USUARIO, ID_SALA };
  try {
    document.querySelector("#root").innerHTML = "";

    const response = await fetch(`${url}/prestamos/filtro`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const solicitudes = await response.json();

    for (let i = 0; i < solicitudes.length; i++) {
     
      let nuevo =
        '<tr>  <td id="id_sala">' +
        solicitudes[i].ID_SALA +
        '</td><td id="id_usuario">' +
        solicitudes[i].ID_USUARIO +
        '</td><td id="nombre">' +
        solicitudes[i].NOMBRE +
        '</td><td id="estado">' +
        solicitudes[i].ESTADO +
        '</td><td id="fecha">' +
        solicitudes[i].FECHA +
        '</td><td id="hora">' +
        solicitudes[i].HORA +
        '</td><td id="c-horas">' +
        solicitudes[i].CANTIDAD_HORAS +
        '</td><td id="acciones"><div class="botoncitos">' +
        '<a onclick="accion(this)" href="#" data-id=' +
        solicitudes[i].ID_PRESTAMO +
        ' data-action = "aprobar" class="editar"><i class="fas fa-check"></i></a>' +
        '<a onclick="accion(this)" href="#" data-id=' +
        solicitudes[i].ID_PRESTAMO +
        ' data-action = "rechazar" class="eliminar"><i class="fas fa-times"></i></a>' +
        "</div></td></tr>";

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    }

  } catch (error) {
    console.log(error);
  }
}
async function mostrarSolicitudes() {
  try {
    const response = await fetch(`${url}/prestamos/`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const solicitudes = await response.json();

    solicitudes.solicitudes.forEach((solicitud) => {
      let nuevo =
        '<tr>  <td id="id_sala">' +
        solicitud.ID_SALA +
        '</td><td id="id_usuario">' +
        solicitud.ID_USUARIO +
        '</td><td id="nombre">' +
        solicitud.NOMBRE +
        '</td><td id="estado">' +
        solicitud.ESTADO +
        '</td><td id="fecha">' +
        solicitud.FECHA +
        '</td><td id="hora">' +
        solicitud.HORA +
        '</td><td id="c-horas">' +
        solicitud.CANTIDAD_HORAS +
        '</td><td id="acciones"><div class="botoncitos">' +
        '<a onclick="accion(this)" href="#" data-id=' +
        solicitud.ID_PRESTAMO +
        ' data-action = "aprobar" class="editar"><i class="fas fa-check"></i></a>' +
        '<a onclick="accion(this)" href="#" data-id=' +
        solicitud.ID_PRESTAMO +
        ' data-action = "rechazar" class="eliminar"><i class="fas fa-times"></i></a>' +
        "</div></td></tr>";

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log(error);
  }
}
mostrarSolicitudes();

// Aprobar o rechazar una solicitud
const usuario = sessionStorage.getItem("ID_USER");

async function accion(boton) {
  const solicitud = boton.getAttribute("data-id");
  const accion = boton.getAttribute("data-action");

  const estado = await action(usuario, solicitud, accion);

  if (!estado.error) {
    console.log("Estado editado correctamente");
    location.reload();
  } else {
    console.log("Error al editar el estado:", estado.error);
  }
}

async function action(ID_USUARIO, ID_SOLICITUD, accion) {
  try {
    const body = { ID_USUARIO };

    const res = await fetch(`${url}/prestamos/${accion}/${ID_SOLICITUD}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al editar el estado");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { error: error.message };
  }
}
