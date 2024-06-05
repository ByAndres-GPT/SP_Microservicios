const inputUsuario = document.querySelector("#idUsuario");
const inputSala = document.querySelector("#idSala");
const inputFecha = document.querySelector("#fecha");

async function filtro() {
  var ID_SALA = inputSala.value;
  var ID_USUARIO = inputUsuario.value;
  var FECHA_ENTRADA = inputFecha.value;
  console.log(ID_SALA+' '+ID_USUARIO+' '+FECHA_ENTRADA)
  var body = { ID_USUARIO, ID_SALA, FECHA_ENTRADA };
  try {
    document.querySelector("#root").innerHTML = "";

    const response = await fetch(`${url4}/entradasYsalidas/filtro`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const registros = await response.json();

    for (let i = 0; i < registros.length; i++) {
      var nuevo =
        '<tr>  <td id="id_sala">' +
        registros[i].ID_SALA +
        '</td><td id="id_usuario">' +
        registros[i].ID_USUARIO +
        '</td><td id="nomre">' +
        registros[i].NOMBRE +
        '</td><td id="fecha_entrada">' +
        registros[i].FECHA_ENTRADA +
        '</td><td id="fecha_salida">' +
        registros[i].FECHA_SALIDA +
        "</td></tr>";

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    }
  } catch (error) {
    console.log(error);
  }
}

async function cargarDatosEntradasSalidas() {
  try {
    const response = await fetch(`${url4}/entradasYsalidas/all`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const registros = await response.json();
    registros.entradas.forEach((entrada) => {
      var nuevo =
        '<tr>  <td id="id_sala">' +
        entrada.ID_SALA +
        '</td><td id="id_usuario">' +
        entrada.ID_USUARIO +
        '</td><td id="nomre">' +
        entrada.NOMBRE +
        '</td><td id="fecha_entrada">' +
        entrada.FECHA_ENTRADA +
        '</td><td id="fecha_salida">' +
        entrada.FECHA_SALIDA +
        "</td></tr>";

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log(error);
  }
}
window.addEventListener("load", cargarDatosEntradasSalidas);

// Cargar registros por Id de sala
const inputIdSala = document.querySelector("#id-sala");
const form = document.querySelector("#form-h-s");

form.addEventListener("submit", validarFormulario);
