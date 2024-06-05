import Usuario from "../models/usuario.js";

//Registrar
export const registrarUsuario = async (req, res) => {
  try {
    //json body
    const { NOMBRE, APELLIDO, CORREO, CONTRASENIA } = req.body;
    //verificar si existe el email
    const existeEmail = await Usuario.findOne({ where: { CORREO } });
    if (existeEmail) {
      return res.status(400).json({
        error: true,
        msg: "Email existente",
      });
    }
    //registrar usuario
    const nuevoUsuario = await Usuario.create({
      NOMBRE,
      APELLIDO,
      CORREO,
      CONTRASENIA,
      ID_ROL: 2,
    });
    res.status(201).json({
      error: false,
      nuevoUsuario: nuevoUsuario.NOMBRE,
      msg: "Su cuenta ha sido creada",
    });
  } catch {
    console.log(error);
    res.status(500).json({
      msg: "No se puedo registrar el usuario",
      error,
    });
  }
};

//login
export const usuarioLogin = async (req, res) => {
  try {
    const { CORREO, CONTRASENIA } = req.body;

    // Busca el usuario
    const usuario = await Usuario.findOne({
      where: { CORREO },
    });
    //si el usuario no existe
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Correo no encontrado",
      });
    }
    //si la contraseña no coincide
    if (CONTRASENIA !== usuario.CONTRASENIA) {
      return res.status(403).json({
        error: true,
        msg: "Correo o contraseña incorrecta",
      });
    }
    res.status(201).json({
      error: false,
      msg: "Has iniciado sesion correctamente",
      id: usuario.ID_USUARIO,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Error en el login.",
    });
  }
};

// Actualizar
export const actualizarUsuario = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params; // Obtener el ID del usuario a actualizar
    const { NOMBRE, APELLIDO, CORREO, CONTRASENIA, ID_ROL } = req.body; // Obtener los datos a actualizar

    // Verificar que el usuario exista
    const usuario = await Usuario.findByPk(ID_USUARIO);
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Usuario no encontrado",
      });
    }

    // Actualizar el usuario
    await usuario.update({
      NOMBRE,
      APELLIDO,
      CORREO,
      CONTRASENIA,
      ID_ROL,
    });

    res.status(200).json({
      error: false,
      msg: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al actualizar usuario",
    });
  }
};

// Eliminar
export const eliminarUsuario = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params; // Obtener el ID del usuario a eliminar
    //console.log("ID del usuario a eliminar:", ID_USUARIO);

    // Verificar que exista el usuario
    const usuario = await Usuario.findByPk(ID_USUARIO);
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Usuario no encontrado",
      });
    }

    await usuario.destroy(); // Eliminar el usuario

    res.status(200).json({
      error: false,
      msg: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al eliminar usuario",
    });
  }
};

// Ver todos los usuarios registrados
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Obtener todos los usuarios

    res.status(200).json({
      error: false,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener usuarios",
    });
  }
};

// Mostrar por id
export const mostrarPorId = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params; // Obtener la id
    const usuario = await Usuario.findAll({
      where: {
        ID_USUARIO: ID_USUARIO,
      },
    });

    res.status(200).json({
      error: false,
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al obtener el usuario",
    });
  }
};

export const filtro = async (req, res) => {
  try {
    const { ID_USUARIO, NOMBRE } = req.body;

    if (ID_USUARIO === "" && NOMBRE === "") {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
      return;
    }else if (ID_USUARIO !== "" && NOMBRE === "") {
      const usuarios = await Usuario.findAll({
        where: { ID_USUARIO: ID_USUARIO },
      });
      res.json(usuarios);
      return;
    } else if (NOMBRE !== "" && ID_USUARIO === "") {
      const usuarios = await Usuario.findAll({
        where: { NOMBRE: NOMBRE },
      });
      res.json(usuarios);
      return;
    } else if (ID_USUARIO !== "" && NOMBRE !== "") {
      const usuarios = await Usuario.findAll({
        where: { ID_USUARIO: ID_USUARIO, NOMBRE: NOMBRE },
      });
      res.json(usuarios);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se puedo listar los usuarios",
      error,
    });
  }
};
