const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#password");
const form = document.querySelector("#form-registro");

form.addEventListener("submit", validarFormulario);



async function validarFormulario(evt) {
  evt.preventDefault();

  if (
    inputNombre.value === "" ||
    inputApellido.value === "" ||
    inputEmail.value === "" ||
    inputContraseña.value === ""
  ) {
    return;
  }

  const usuarioNuevo = await registrar(
    inputNombre.value,
    inputApellido.value,
    inputEmail.value,
    inputContraseña.value
  );

  if(!usuarioNuevo.error){

    location.replace('/index.html')
  }
}

async function registrar(NOMBRE, APELLIDO, CORREO, CONTRASENIA) {
  const body = { NOMBRE, APELLIDO, CORREO, CONTRASENIA };
  const res = await fetch(`${url}/users/registrar`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  return json;
}
