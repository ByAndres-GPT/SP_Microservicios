const inputId = document.querySelector("#id-s-l");
const form = document.querySelector("#form-login-sala");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputId.value === "") {
    return;
  }

  const entrar = await buscarSala(inputId.value);

  if (entrar.error) {
    alert("Datos incorrectos");
    location.reload();
    return;
  }

  //console.log(entrar.sala.ID_SALA);
  localStorage.setItem("SALA_ID", entrar.sala.ID_SALA);
  location.replace("registro-entradas-salidas-salas.html");
}

async function buscarSala(ID_SALA) {
  try {
    const res = await fetch(`${url3}/salas/sala/${ID_SALA}`);
    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return { err: true };
  }
}

function cerrar() {
  localStorage.removeItem("SALA_ID");
  location.replace("/loginSala.html");
}
