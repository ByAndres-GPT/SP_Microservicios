import { where } from "sequelize";
import Prestamo from "../models/prestamo.js";
import Sala from "../models/sala.js";
import Usuario from "../models/usuario.js";

// Crear solicitud de préstamo
export const crearSolicitudPrestamo = async (req, res) => {
  try {
    const { FECHA, HORA, CANTIDAD_HORAS, ID_USUARIO, NOMBRE, ID_SALA } =
      req.body;
    // Verificar si la hora esta disponible
    const horaDisponible = await Prestamo.findOne({
      where: {
        FECHA,
        HORA,
        ID_SALA,
        ESTADO: ["aprobado", "pendiente"],
      },
    });
    if (horaDisponible) {
      return res.status(404).json({
        error: true,
        msg: "La hora seleccionada no esta disponible",
      });
    }

    //Crear la solicitud
    const nuevaSolicitud = await Prestamo.create({
      FECHA,
      HORA,
      CANTIDAD_HORAS,
      ID_USUARIO,
      NOMBRE,
      ID_SALA,
    });

    res.status(201).json({
      error: false,
      msg: "Solicitud de préstamo creada exitosamente",
      nuevaSolicitud,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al crear solicitud de préstamo",
    });
  }
};

// Obtener todas las solicitudes de préstamo pendientes
export const obtenerSolicitudesPendientes = async (req, res) => {
  try {
    const solicitudesPendientes = await Prestamo.findAll({
      where: {
        ESTADO: "pendiente",
      },
    });

    res.status(200).json({
      error: false,
      solicitudesPendientes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener solicitudes pendientes",
    });
  }
};

//ver todas las solicitudes
export const obtenerTodasSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Prestamo.findAll();
    res.status(200).json({
      error: false,
      solicitudes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener solicitudes",
    });
  }
};

//ver todas las solicitudes de un usuario
export const solicitudesUser = async (req, res) => {
  try {
    const {ID_USUARIO} = req.params;
    const solicitudes = await Prestamo.findAll({where:{ID_USUARIO: ID_USUARIO}});
    res.status(200).json({
      error: false,
      solicitudes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener solicitudes",
    });
  }
};

// Aprobar solicitud de préstamo
export const aprobarSolicitudPrestamo = async (req, res) => {
  try {
    const { ID_PRESTAMO } = req.params;
    const { ID_USUARIO } = req.body;

    // Busca el usuario en la base de datos
    const usuario = await Usuario.findByPk(ID_USUARIO);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: true, msg: "Usuario no encontrado" });
    }

    // Comprobar si el usuario es un administrador
    if (usuario.ID_ROL === 1) {
      const solicitud = await Prestamo.findByPk(ID_PRESTAMO);
      if (!solicitud) {
        return res.status(404).json({
          error: true,
          msg: "Solicitud de préstamo no encontrada",
        });
      }

      solicitud.ESTADO = "aprobado";
      await solicitud.save();

      res.status(200).json({
        error: false,
        msg: "Solicitud de préstamo aprobada exitosamente",
        solicitud,
      });
    } else {
      res.status(403).json({ error: true, msg: "Acceso no autorizado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al aprobar solicitud de préstamo",
    });
  }
};

// Rechazar solicitud de préstamo
export const rechazarSolicitudPrestamo = async (req, res) => {
  try {
    const { ID_PRESTAMO } = req.params;
    const { ID_USUARIO } = req.body;

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(ID_USUARIO);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: true, msg: "Usuario no encontrado" });
    }

    // Comprobar si es administrador
    if (usuario.ID_ROL === 1) {
      const solicitud = await Prestamo.findByPk(ID_PRESTAMO);
      if (!solicitud) {
        return res.status(404).json({
          error: true,
          msg: "Solicitud de préstamo no encontrada",
        });
      }

      solicitud.ESTADO = "rechazado";
      await solicitud.save();

      res.status(200).json({
        error: false,
        msg: "Solicitud de préstamo rechazada exitosamente",
        solicitud,
      });
    } else {
      res.status(403).json({ error: true, msg: "Acceso no autorizado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al rechazar solicitud de préstamo",
    });
  }
};

export const obtenerSolicitudesPorDia = async (req, res) => {
  try {
    const { FECHA, ID_SALA } = req.body;

    console.log(ID_SALA);
    const reservadas = await Prestamo.findAll({
      where: { FECHA, ID_SALA, ESTADO: ["aprobado", "pendiente"] },
    });
    if (!reservadas) {
      return res.status(404).json({
        error: true,
        msg: "Solicitud de préstamo no encontrada",
      });
    }

    res.status(200).json({
      error: false,
      msg: "Horas reservadas encontradas",
      reservadas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al encontrar solicitud de préstamo",
    });
  }
};

// --------Filtrar ID_USUARIO y ID_SALA---------
export const filtroUsuarioSala = async (req, res) => {
  try {
    const { ID_USUARIO, ID_SALA } = req.body;

    if (ID_USUARIO === "" && ID_SALA === "") {
      const solicitudes = await Prestamo.findAll();
      res.json(solicitudes);
      return;
    }else if (ID_USUARIO !== "" && ID_SALA === "") {
      const solicitudes = await Prestamo.findAll({
        where: { ID_USUARIO: ID_USUARIO },
      });
      res.json(solicitudes);
      return;
    } else if (ID_SALA !== "" && ID_USUARIO === "") {
      const solicitudes = await Prestamo.findAll({
        where: { ID_SALA: ID_SALA },
      });
      res.json(solicitudes);
      return;
    } else if (ID_USUARIO !== "" && ID_SALA !== "") {
      const solicitudes = await Prestamo.findAll({
        where: { ID_USUARIO: ID_USUARIO, ID_SALA: ID_SALA },
      });
      res.json(solicitudes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se puedo listar los usuarios",
      error,
    });
  }
};
