import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Prestamo = sequelize.define("prestamos", {
  ID_PRESTAMO: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FECHA: {
    type: Sequelize.DATEONLY,
  },
  HORA: {
    type: Sequelize.TIME,
  },
  CANTIDAD_HORAS: {
    type: Sequelize.INTEGER,
  },
  ESTADO: {
    type: Sequelize.ENUM("pendiente", "aprobado", "rechazado"),
    defaultValue: "pendiente",
  },
  ID_USUARIO: {
    type: Sequelize.INTEGER,
  },
  NOMBRE: {
    type: Sequelize.STRING,
  },
  ID_SALA: {
    type: Sequelize.INTEGER,
  },
});

export default Prestamo;
