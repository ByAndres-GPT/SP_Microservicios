async function mostrarInformacion() {
  const id = sessionStorage.getItem("ID_USER");
  //console.log(id);
  try {
    const response = await fetch(`${url1}/users/user/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();

    document.getElementById("m-id").textContent = usuario.usuario[0].ID_USUARIO;
    document.getElementById("m-nombre").textContent = usuario.usuario[0].NOMBRE;
    document.getElementById("m-apellido").textContent =
      usuario.usuario[0].APELLIDO;
    document.getElementById("m-correo").textContent = usuario.usuario[0].CORREO;
    document.getElementById("m-barra").textContent =
      usuario.usuario[0].NOMBRE + " " + usuario.usuario[0].APELLIDO;
    sessionStorage.setItem(
      "NOMBRE_USER",
      (textContent = usuario.usuario[0].NOMBRE)
    );
  } catch (error) {
    console.log("error");
  }
}

mostrarInformacion();

// Para el botón de editar
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#correo");
const id = sessionStorage.getItem("ID_USER");
async function cargarDatosUsuario() {
  try {
    const response = await fetch(`${url1}/users/user/${id}`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos del usuario");
    }
    const usuario = await response.json();

    // Llenar los campos del formulario con los datos del usuario

    inputNombre.value = usuario.usuario[0].NOMBRE;
    inputApellido.value = usuario.usuario[0].APELLIDO;
    inputEmail.value = usuario.usuario[0].CORREO;
  } catch (error) {
    console.error("Error al cargar los datos del usuario:", error);
  }
}

const form = document.querySelector("#form-editar-admin");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (
    inputNombre.value === "" ||
    inputApellido.value === "" ||
    inputEmail.value === ""
  ) {
    return;
  }

  const usuarioNuevo = await editar(
    id,
    inputNombre.value,
    inputApellido.value,
    inputEmail.value
  );

  if (!usuarioNuevo.error) {
    console.log("Usuario editado correctamente");
    location.replace("informacion-admin.html");
  } else {
    console.log("Error al editar el usuario:", usuarioNuevo.error);
  }
}

async function editar(ID_USUARIO, NOMBRE, APELLIDO, CORREO) {
  try {
    const body = { NOMBRE, APELLIDO, CORREO };

    const res = await fetch(`${url1}/users/actualizar/${ID_USUARIO}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { error: error.message };
  }
}
