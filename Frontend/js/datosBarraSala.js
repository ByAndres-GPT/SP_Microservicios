async function mostrarInformacion() {
    const id = localStorage.getItem("SALA_ID");
    try {
      const response = await fetch(`${url}/salas/sala/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la sala");
      }
  
      const sala = await response.json();
      document.getElementById("m-barra").textContent =
        sala.sala.NOMBRE;
    } catch (error) {
      console.log("error");
    }
  }
  mostrarInformacion();
  