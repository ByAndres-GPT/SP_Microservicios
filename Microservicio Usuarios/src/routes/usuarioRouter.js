import express from "express";
import Usuario from "../models/usuario.js";
import {
  registrarUsuario,
  usuarioLogin,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
  mostrarPorId,
  filtro
} from "../controllers/usuarioController.js";
import sequelize from "../database/db.js";

const router = express.Router();

// Peticiones GET
router.get("/", (req, res) => {
  res.json({ msg: "endpoint created" });
});
router.get("/allUsers", obtenerUsuarios); // Obtener todos los usuarios
router.get("/user/:ID_USUARIO", mostrarPorId); // Obtener usuario con id

//Peticiones POST
router.post("/registrar", registrarUsuario); //registrar usuario
router.post("/login", usuarioLogin); //login
router.post('/filtro', filtro); // Filtro de usuarios por ID y NOMBRE

//Peticiones PUT
router.put("/actualizar/:ID_USUARIO", actualizarUsuario); // Actualizar usuario

//Peticiones DELETE
router.delete("/eliminar/:ID_USUARIO", eliminarUsuario); // Eliminar usuario

// Para saber si es admin o nel
router.get("/:ID_USUARIO/es-administrador", async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;

    // verificar si existe
    const usuario = await Usuario.findByPk(ID_USUARIO);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: true, 
          msg: "Usuario no encontrado" });
    }

    // si ID_ROL es 1, es admin
    const esAdmin = usuario.ID_ROL === 1;

    res.status(200).json({ esAdmin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: true,
        msg: "Error al verificar el estado de administrador",
      });
  }
});

export default router;
