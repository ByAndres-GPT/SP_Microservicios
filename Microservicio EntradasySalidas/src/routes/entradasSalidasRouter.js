import express from "express";
import {
  registrarEntrada,
  registrarSalida,
  mostrarPorId,
  obtenerTodosRegistros,
  usuariosEnSala,
  filtro,
} from "../controllers/entradasSalidasController.js";

const router = express.Router();

//Peticiones GET
router.get("/all", obtenerTodosRegistros); //para ver todos los registros de la tabla
router.get("/registro/:ID_SALA", mostrarPorId); // ver el registro de entradas/salidas de una sala
router.get("/enSala/:ID_SALA", usuariosEnSala); // ver usuarios en sala

// Peticiones POST
router.post("/entrar", registrarEntrada); // registrar la entrada
router.post("/salir", registrarSalida); // registrar la salida
router.post("/filtro", filtro); // Filtro del historial

export default router;
