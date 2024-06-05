import Sala from "../models/sala.js";

//Crear Sala
export const crearSala = async (req, res) => {
  try {
    //json body
    const { NOMBRE, DESCRIPCION } = req.body;
    //verificar si existe la sala
    const existeId = await Sala.findOne({ where: { NOMBRE } });
    if (existeId) {
      return res.status(400).json({
        error: true,
        msg: "Sala existente",
      });
    }
    //Crear la sala
    const nuevaSala = await Sala.create({
      NOMBRE,
      DESCRIPCION,
    });
    console.log("va bien");
    res.status(201).json({
      error: false,
      nuevaSala: nuevaSala.NOMBRE,
      msg: "La sala ha sido creada",
    });
  } catch {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo crear la sala",
      error,
    });
  }
};

// Actualizar
export const actualizarSala = async (req, res) => {
  try {
    const { ID_SALA, NOMBRE, DESCRIPCION, ESTADO } = req.body; // Obtener los datos a actualizar

    // Verificar si la sala existe
    const sala = await Sala.findByPk(ID_SALA);
    if (!sala) {
      return res.status(404).json({
        error: true,
        msg: "Sala no encontrada",
      });
    }

    // Hace la actualización
    await sala.update({
      NOMBRE,
      DESCRIPCION,
      ESTADO,
    });

    res.status(200).json({
      error: false,
      msg: "Sala actualizada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al actualizar la sala",
    });
  }
};

// Eliminar
export const eliminarSala = async (req, res) => {
  try {
    const { ID_SALA } = req.params; // Obtener el ID de la sala a eliminar

    // Verificar si la sala existe
    const sala = await Sala.findByPk(ID_SALA);
    if (!sala) {
      return res.status(404).json({
        error: true,
        msg: "Sala no encontrada",
      });
    }

    await sala.destroy(); // Intentar eliminar la sala

    res.status(200).json({
      error: false,
      msg: "Sala eliminada exitosamente",
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        error: true,
        msg: "No se puede eliminar la sala debido a restricciones de clave externa",
      });
    }
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al eliminar la sala",
    });
  }
};


// devuelve todas las salas
export const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll(); // Obtener todas las salas

    res.status(200).json({
      error: false,
      salas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener las salas",
    });
  }
};

// Mostrar por id
export const mostrarPorId = async (req, res) => {
  try {
    const { ID_SALA } = req.params; // Obtener la id
    const sala = await Sala.findOne({
      where: { ID_SALA },
    });

    if (!sala) {
      return res.status(404).json({
        error: true,
        msg: "Sala no encontrada",
      });
    }

    res.status(200).json({
      error: false,
      sala,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener la sala",
    });
  }
};
