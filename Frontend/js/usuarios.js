const inputUsuario = document.querySelector("#idUsuario");
const inputNombrefiltro = document.querySelector("#nombreUsuario");

async function filtro() {
  var ID_USUARIO = inputUsuario.value;
  var NOMBRE = inputNombrefiltro.value;

  var body = { ID_USUARIO, NOMBRE };
  try {
    document.querySelector("#root").innerHTML = "";

    const response = await fetch(`${url}/users/filtro`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const usuarios = await response.json();

    for (let i = 0; i < usuarios.length; i++) {
      let nuevo =
        '<tr>  <td id="id_usuario">' +
        usuarios[i].ID_USUARIO +
        '</td><td id="nombre">' +
        usuarios[i].NOMBRE +
        '</td><td id="apellido">' +
        usuarios[i].APELLIDO +
        '</td><td id="correo">' +
        usuarios[i].CORREO +
        '</td><td id="rol">' +
        usuarios[i].ID_ROL +
        '</td><td data-cell="acciones"><div class="botoncitos"><a href="#modalEditar" onclick="cargarDatosUsuario(' +
        usuarios[i].ID_USUARIO +
        ')" class="editar"><i class="fas fa-edit"></i></a><a href="#" onclick="validarEliminar(this)" class="eliminar" data-id=' +
        usuarios[i].ID_USUARIO +
        '><i class="fas fa-trash-alt"></i></a></div></tr>';

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    };
  } catch (error) {
    console.log(error);
  }
}

async function mostrarUsuarios() {
  try {
    const response = await fetch(`${url}/users/allUsers`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los registros");
    }

    const usuarios = await response.json();

    usuarios.usuarios.forEach((usuario) => {
      let nuevo =
        '<tr>  <td id="id_usuario">' +
        usuario.ID_USUARIO +
        '</td><td id="nombre">' +
        usuario.NOMBRE +
        '</td><td id="apellido">' +
        usuario.APELLIDO +
        '</td><td id="correo">' +
        usuario.CORREO +
        '</td><td id="rol">' +
        usuario.ID_ROL +
        '</td><td data-cell="acciones"><div class="botoncitos"><a href="#modalEditar" onclick="cargarDatosUsuario(' +
        usuario.ID_USUARIO +
        ')" class="editar"><i class="fas fa-edit"></i></a><a href="#" onclick="validarEliminar(this)" class="eliminar" data-id=' +
        usuario.ID_USUARIO +
        '><i class="fas fa-trash-alt"></i></a></div></tr>';

      document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
    });
  } catch (error) {
    console.log(error);
  }
}
mostrarUsuarios();

// Actualizar user

const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#correo");
async function cargarDatosUsuario(id) {
  idEdit = id;
  try {
    const response = await fetch(`${url}/users/user/${id}`);
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

const form = document.querySelector("#form-editar-datos-user");

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
    idEdit,
    inputNombre.value,
    inputApellido.value,
    inputEmail.value
  );
  console.log(usuarioNuevo);

  if (!usuarioNuevo.error) {
    location.replace('gestion-usuarios-admin');
  } else {
    console.log("Error al editar el usuario:", usuarioNuevo.error);
  }
}

async function editar(ID_USUARIO, NOMBRE, APELLIDO, CORREO) {
  try {
    const body = { NOMBRE, APELLIDO, CORREO };

    const res = await fetch(`${url}/users/actualizar/${ID_USUARIO}`, {
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

// Eliminar user

async function validarEliminar(boton) {
  const id = boton.getAttribute("data-id");

  if (id === null) {
    console.log("Error al eliminar el usuario:");
  } else {
    const usuarioEliminado = await eliminar(id);
    console.log(usuarioEliminado);

    if (!usuarioEliminado.error) {
      console.log("Usuario eliminado correctamente");
      location.reload();
    } else {
      console.log("Error al eliminar el usuario:", usuarioEliminado.error);
    }
  }
}

async function eliminar(id) {
  try {
    const res = await fetch(`${url}/users/eliminar/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return { error: error.message };
  }
}
