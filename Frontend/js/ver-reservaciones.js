async function mostrarInformacion() {  

    const id = sessionStorage.getItem("ID_USER");  
    try {
      const response = await fetch(`${url2}/prestamos/usuario/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtene la sala");
      }
  
      const reservaciones = await response.json();
  
      reservaciones.solicitudes.forEach((solicitud) => {
        let nuevo =
          '<tr>  <td id="id-sala">' +
          solicitud.ID_SALA +
          '</td><td id="fecha">' +
          solicitud.FECHA +
          '</td><td id="cantidad-horas">' +
          solicitud.CANTIDAD_HORAS +
          '</td><td id="estado">' +
          solicitud.ESTADO +
          '</td></tr>';
  
        document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
      });
    } catch (error) {
      console.log("error");
    }
  }
  mostrarInformacion();
  