let idEdit = null;
//Mostrar las salas
async function mostrarSalas() {
  try {
    const response = await fetch(`${url}/salas/all`);
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
        '</div><div class="botones separador"><div class="one-third"><form action="detalles-sala-admin"><input type="hidden" name="id-sala" value="' +
        sala.ID_SALA +
        '"><button type="submit" class="boton-detalles" >Detalles</button></form></div><div class="one-third"><a href="#modalEditar" onclick="cargarDatos(' +
        sala.ID_SALA +
        ')"><img src="img/editar.png" alt="" width="17"></a></div><div class="one-third no-border"><a href="#" onclick="mensajeEliminar(' +
        sala.ID_SALA +
        ')" class="editar"><img src="img/eliminar.png" alt="" width="17"></a></div></div></div>';

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log(error);
  }
}
mostrarSalas();

//Crear salas

const inputId = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const form = document.querySelector("#formCrear");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputId.value === "" || inputDescripcion.value === "") {
    return;
  }

  const salaNueva = await crear(inputId.value, inputDescripcion.value);

  if (!salaNueva.error) {
    console.log("Sala creada correctamente");
    location.replace("gestion-salas-admin.html");
  } else {
    console.log("Error al crear la sala:", salaNueva.error);
  }
}

async function crear(NOMBRE, DESCRIPCION) {
  try {
    const body = { NOMBRE, DESCRIPCION };

    const res = await fetch(`${url}/salas/crear`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al crear la sala");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al crear la sala:", error);
    return { error: error.message };
  }
}

//Para editar una sala

const inputEditNombre = document.querySelector("#edit-nombre");
const inputEditDesc = document.querySelector("#edit-desc");
const inputEditEstado = document.querySelector("#edit-estado");

// Cargar Datos
async function cargarDatos(id) {
  idEdit = id;
  try {
    const response = await fetch(`${url}/salas/sala/${id}`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos del usuario");
    }
    const sala = await response.json();

    // Llenar los campos del formulario con los datos

    inputEditNombre.value = sala.sala.NOMBRE;
    inputEditDesc.value = sala.sala.DESCRIPCION;
  } catch (error) {
    console.error("Error al cargar los datos de la sala", error);
  }
}

const formEdit = document.querySelector("#formEditar");
formEdit.addEventListener("submit", validarFormularioEdit);

async function validarFormularioEdit(evt) {
  evt.preventDefault();

  if (
    inputEditNombre.value === "" ||
    inputEditDesc.value === "" ||
    inputEditEstado.value === ""
  ) {
    return;
  }

  const salaEdit = await editar(
    idEdit,
    inputEditNombre.value,
    inputEditDesc.value,
    inputEditEstado.options[inputEditEstado.selectedIndex].text
  );

  if (!salaEdit.error) {
    console.log("Sala actualizada correctamente");
    location.replace("gestion-salas-admin.html"); // Recarga la página después de la actualización
  } else {
    console.log("Error al actualizar la sala:", salaEdit.error);
  }
}

async function editar(ID_SALA, NOMBRE, DESCRIPCION, ESTADO) {
  try {
    const body = { ID_SALA, NOMBRE, DESCRIPCION, ESTADO }; // Elimina el ID_SALA del cuerpo

    const res = await fetch(`${url}/salas/actualizar/${ID_SALA}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar la sala");
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error al actualizar la sala:", error);
    return { error: error.message };
  }
}

//Para eliminar una sala
async function eliminar(id) {
  try {
    const res = await fetch(`${url}/salas/eliminar/${id}`, {
      method: "DELETE",
    });    

    const json = await res.json();

    if (json.error) {
      showAlert("error", json.msg);
    } else {
      location.reload(); // Recarga la página si la eliminación fue exitosa
    }

    return json;
  } catch (error) {
    console.log("Error al eliminar la sala:", error);
    return { error: error.message };
  }
}


function mensajeEliminar(id) {
  if (window.confirm("¿Seguro que quieres eliminar esta sala?")) {
    eliminar(id);
  }
}

function showAlert(type, msg) {
  window.alert(msg);
}
