import express from "express";
import {
  crearSolicitudPrestamo,
  obtenerSolicitudesPendientes,
  aprobarSolicitudPrestamo,
  rechazarSolicitudPrestamo,
  obtenerTodasSolicitudes,
  obtenerSolicitudesPorDia,
  filtroUsuarioSala,
  solicitudesUser
} from "../controllers/prestamoController.js";

const router = express.Router();

// Peticiones GET

router.get('/', obtenerTodasSolicitudes);
router.get('/usuario/:ID_USUARIO', solicitudesUser);
router.get('/pendientes', obtenerSolicitudesPendientes); // Obtener las solicitudes pendientes

//Peticiones POST
router.post('/dias', obtenerSolicitudesPorDia); // Busca las solicisitudes aprovadas de un dia en especifico
router.post('/solicitar', crearSolicitudPrestamo);// Solicitar el prestamo de una sala
router.post('/aprobar/:ID_PRESTAMO', aprobarSolicitudPrestamo); // Aprobar el prestamo de una sala
router.post('/rechazar/:ID_PRESTAMO', rechazarSolicitudPrestamo); // Rechazar el prestamo de una sala
router.post('/filtro', filtroUsuarioSala) // Filtro por ID_USUARIO y ID_SALA

//Peticiones PUT

//Peticiones DELETE


export default router;