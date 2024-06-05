const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#password");
const form = document.querySelector("#form-login");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputEmail.value === "" || inputContraseña.value === "") {
    return;
  }

  const entrar = await login(inputEmail.value, inputContraseña.value);
  if (entrar.error) {
    alert("Datos incorrectos");
    return;
  }
  sessionStorage.setItem("ID_USER", entrar.id);
  location.reload();
  //location.replace("/informacion_admin.html");
}

async function login(CORREO, CONTRASENIA) {
  const body = { CORREO, CONTRASENIA };

  try {
    const res = await fetch(`${url1}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return { err: true };
  }
}
