var idEdit = undefined;
const alertMessage = document.querySelector("#alert");
//Mostrar las salas
async function mostrarSalas() {
  try {
    const response = await fetch(`${url3}/salas/all`);
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de paquetes");
    }

    const salas = await response.json();

    salas.salas.forEach((sala) => {
      var nuevo =
        '<div class="card"><div class="ubicacion">' +
        sala.NOMBRE +
        '</div><div class="">Id: ' +
        sala.ID_SALA +
        '</div><div class="descripcion">' +
        sala.DESCRIPCION +
        '</div><div class="sala">Estado: ' +
        sala.ESTADO +
        '</div><div class="separadorr"><div class="boton-reservar"><a class="boton" href="#openModal" onclick="mostrarDatos(' +
        sala.ID_SALA +
        ')">Reservar sala</a></div></div></div>';

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log(error);
  }
}
mostrarSalas();
const inputIdSala = document.querySelector("#idSala");
const inputIdSala2 = document.querySelector("#idSala2");
// Cargar Datos
async function mostrarDatos(id) {
  idEdit = id;
  try {
    const response = await fetch(`${url3}/salas/sala/${id}`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos del usuario");
    }
    const sala = await response.json();

    // Llenar los campos del formulario con los datos

    inputIdSala.innerHTML = sala.sala.NOMBRE;
    inputIdSala2.innerHTML = sala.sala.NOMBRE;
  } catch (error) {
    console.error("Error al cargar los datos de la sala", error);
  }
}
//reservar (fecha)
const htmlhorasOcupadas = document.querySelector("#horasOcupadas");
const inputFecha = document.querySelector("#fecha");
async function reservarFecha() {
  try {
    const FECHA = inputFecha.value;
    const ID_SALA = idEdit;

    const body = { FECHA, ID_SALA };
    const res = await fetch(`${url}/prestamos/dias`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (json.reservadas.length > 0) {
      var horasOcupadas = "Horas ocupadas: ";
      for (let i = 0; i < json.reservadas.length; i++) {
        horasOcupadas = horasOcupadas + ", " + json.reservadas[i].HORA;
      }

      htmlhorasOcupadas.innerHTML = horasOcupadas;
    } else {
      htmlhorasOcupadas.innerHTML = "Ninguna hora ocupada";
    }

    return json;
  } catch (error) {
    console.error("Error mostrar horas reservadas:", error);
    return { error: error.message };
  }
}

//reservar (hora)

var inputId = idEdit;
const user = sessionStorage.getItem("ID_USER");
const form = document.querySelector("#formReservar");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();
  inputId = 2;
  if (inputId.value === "") {
    return;
  }

  const prestamoNuevo = await solicitar(user, inputId.value);

  if (!prestamoNuevo.error) {
    console.log("Prestamo solicitado correctamente");
    location.replace("reserva-salas-user");
  } else {
    console.log("Error al solicitar el prestamo:", prestamoNuevo.error);
  }
}

const inputHoras = document.querySelector("#hora");
const inputCHoras = document.querySelector("#cantidadHoras");
async function solicitar() {
  try {
    const FECHA = inputFecha.value;
    const HORA = inputHoras.value;
    const CANTIDAD_HORAS = inputCHoras.value;
    const ID_USUARIO = sessionStorage.getItem("ID_USER");
    const NOMBRE = sessionStorage.getItem("NOMBRE_USER");
    const ID_SALA = idEdit;
    const body = { FECHA, HORA, CANTIDAD_HORAS, ID_USUARIO, NOMBRE, ID_SALA };

    const res = await fetch(`${url2}/prestamos/solicitar`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();
    console.log(json);

    if (json.error) {
      showAlert("error", json.msg);
      return;
    }

    return json;
  } catch (error) {
    showAlert("error", "La hora no esta disponible");
    return;
  }
}

function showAlert(type, msg) {
  alertMessage.classList.remove("alert", "alert-danger", "alert-success");
  if (type === "error") {
    alertMessage.classList.add("alert", "alert-danger");
    alertMessage.textContent = msg;
  }
  console.log(type);
}
