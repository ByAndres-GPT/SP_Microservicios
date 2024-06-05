const inputId2 = document.querySelector("#id-user-es");
const form2 = document.querySelector("#form-sala");
const select = document.querySelector("#select");
const sala = localStorage.getItem("SALA_ID");

form2.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (
    inputId2.value === ""
  ) {
    return;
  }

  const asistencia = await registrar(
    inputId2.value,
    sala,    
    select.options[select.selectedIndex].text
  );

  if (!asistencia.error) {
    alert("OK")
    location.reload();
  } else {
    alert(asistencia.error);
    location.reload();
  }
}

async function registrar(ID_USUARIO, ID_SALA, accion) {
  try {
    const body = { ID_USUARIO, ID_SALA };

    const res = await fetch(`${url4}/entradasYsalidas/${accion}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al registrar su entrada/salida");    
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al registrar su entrada/salida:", error);
    return { error: error.message };
  }
}