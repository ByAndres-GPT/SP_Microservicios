import { where } from "sequelize";
import EntradaSalida from "../models/entradaYSalida.js";
import Usuario from "../models/usuario.js";
import Sala from "../models/sala.js";

// Registrar la entrada a la sala
export const registrarEntrada = async (req, res) => {
  try {
    const { ID_USUARIO, ID_SALA } = req.body;

    const usuario = await Usuario.findOne({
      where: { ID_USUARIO: ID_USUARIO },
    });

    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "El usuario no existe",
      });
    }

    const nombre = usuario.NOMBRE;

    // Para verificar si el usuario está en la sala
    const entradaExistente = await EntradaSalida.findOne({
      where: {
        ID_USUARIO,
        ID_SALA,
        FECHA_SALIDA: null,
      },
    });

    // verifica si el usuario está en la sala
    if (entradaExistente) {
      return res
        .status(400)
        .json({ error: true, msg: "El usuario ya está en la sala" });
    }

    // Si no está en la sala, crea una nueva entrada
    await EntradaSalida.create({
      FECHA_ENTRADA: new Date(),
      ID_USUARIO,
      NOMBRE: nombre,
      ID_SALA,
    });

    const state = await saberEstado(ID_SALA);
    const sala = await Sala.findByPk(ID_SALA);
    if (!sala) {
      return res.status(404).json({
        error: true,
        msg: "Sala no encontrada",
      });
    }

    if (state === false) {
      await sala.update({
        ESTADO: "vacio",
      });
    } else {
      await sala.update({
        ESTADO: "ocupado",
      });
    }

    res
      .status(200)
      .json({ error: false, msg: "Entrada registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Error al registrar la entrada" });
  }
};

async function saberEstado(id) {
  try {
    // Buscar una entrada activa para la sala especificada
    const entradaActiva = await EntradaSalida.findOne({
      where: {
        ID_SALA: id,
        FECHA_SALIDA: null,
      },
    });

    // Si se encontró una entrada activa, la sala está ocupada
    if (entradaActiva) {
      return true; // Sala ocupada
    } else {
      return false; // Sala vacía
    }
  } catch (error) {
    console.error("Error al buscar estado de la sala:", error);
    throw error; // Propaga el error para que sea manejado en un nivel superior
  }
}

// registrar la salida de la sala
export const registrarSalida = async (req, res) => {
  try {
    const { ID_USUARIO, ID_SALA } = req.body;

    const entradaActiva = await EntradaSalida.findOne({
      where: {
        ID_USUARIO,
        ID_SALA,
        FECHA_SALIDA: null,
      },
    });

    // verifica que el usuario esté en la sala
    if (!entradaActiva) {
      return res.status(400).json({
        error: true,
        msg: "El usuario no está actualmente en la sala",
      });
    }

    // Actualiza la fecha de la salida
    entradaActiva.FECHA_SALIDA = new Date();
    await entradaActiva.save();

    const state = await saberEstado(ID_SALA);
    const sala = await Sala.findByPk(ID_SALA);
    if (!sala) {
      return res.status(404).json({
        error: true,
        msg: "Sala no encontrada",
      });
    }

    if (state === false) {
      await sala.update({
        ESTADO: "vacio",
      });
    } else {
      await sala.update({
        ESTADO: "ocupado",
      });
    }

    res
      .status(200)
      .json({ error: false, msg: "Salida registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Error al registrar la salida" });
  }
};

//Traer los registros por id de sala

export const mostrarPorId = async (req, res) => {
  try {
    const { ID_SALA } = req.params; // Obtener la id
    const sala = await Sala.findAll({
      where: {
        ID_SALA: ID_SALA,
      },
    });

    res.status(200).json({
      error: false,
      sala,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener el registro de la sala",
    });
  }
};

//Traer todos los registros de la tabla

export const obtenerTodosRegistros = async (req, res) => {
  try {
    const entradas = await EntradaSalida.findAll(); // Obtener todos los registros

    res.status(200).json({
      error: false,
      entradas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener los registros",
    });
  }
};

// todos los usuarios que están dentro de la sala

export const usuariosEnSala = async (req, res) => {
  try {
    const { ID_SALA } = req.params; //obtener el id de la sala

    const datos = await EntradaSalida.findAll({
      where: {
        ID_SALA: ID_SALA,
        FECHA_SALIDA: null,
      },
    });

    if (!datos) {
      return res.status(404).json({
        error: true,
        msg: "No se encontraron registros",
      });
    }

    console.log(datos);

    res.status(200).json({
      error: false,
      datos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener los registros",
    });
  }
};

// --------Filtrar ID_USUARIO y ID_SALA---------
export const filtro = async (req, res) => {
  try {
    const { ID_USUARIO, ID_SALA, FECHA_ENTRADA } = req.body;
    if (ID_USUARIO === "" && ID_SALA === "" && FECHA_ENTRADA === "") {
      const entradas = await EntradaSalida.findAll();
      res.json(entradas);
      return;
    } else if (ID_USUARIO !== "" && ID_SALA === "" && FECHA_ENTRADA === "") {
      const entradas = await EntradaSalida.findAll({
        where: { ID_USUARIO: ID_USUARIO },
      });
      res.json(entradas);
      return;
    } else if (ID_USUARIO === "" && ID_SALA !== "" && FECHA_ENTRADA === "") {
      const entradas = await EntradaSalida.findAll({
        where: { ID_SALA: ID_SALA },
      });
      res.json(entradas);
      return;
    } else if (ID_USUARIO === "" && ID_SALA === "" && FECHA_ENTRADA !== "") {
      const entradas = await EntradaSalida.findAll({
        where: { FECHA_ENTRADA: FECHA_ENTRADA },
      });
      res.json(entradas);
      return;
    } else if (ID_USUARIO !== "" && ID_SALA !== "" && FECHA_ENTRADA === "") {
      const entradas = await EntradaSalida.findAll({
        where: { ID_USUARIO: ID_USUARIO, ID_SALA: ID_SALA },
      });
      res.json(entradas);
      return;
    } else if (ID_USUARIO === "" && ID_SALA !== "" && FECHA_ENTRADA !== "") {
      const entradas = await EntradaSalida.findAll({
        where: { FECHA_ENTRADA: FECHA_ENTRADA, ID_SALA: ID_SALA },
      });
      res.json(entradas);
      return;
    } else if (ID_USUARIO !== "" && ID_SALA === "" && FECHA_ENTRADA !== "") {
      const entradas = await EntradaSalida.findAll({
        where: { FECHA_ENTRADA: FECHA_ENTRADA, ID_USUARIO: ID_USUARIO },
      });
      res.json(entradas);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se puedo listar los usuarios",
      error,
    });
  }
};
