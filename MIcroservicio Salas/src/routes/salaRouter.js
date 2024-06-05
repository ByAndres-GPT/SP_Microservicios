import express from "express";
import {
  crearSala,
  actualizarSala,
  eliminarSala,
  obtenerSalas,
  mostrarPorId
} from "../controllers/salaController.js";

const router = express.Router();

// Peticiones GET
router.get('/', (req, res) => {
    res.json({msg: 'endpoint created'});
});
router.get('/all', obtenerSalas); // Obtener todas las salas
router.get("/sala/:ID_SALA", mostrarPorId); // Obtener usuario con id

//Peticiones POST
router.post('/crear', crearSala);//registrar sala

//Peticiones PUT
router.put('/actualizar/:ID_SALA', actualizarSala); // Actualizar sala

//Peticiones DELETE
router.delete('/eliminar/:ID_SALA', eliminarSala); // Eliminar sala


export default router;
