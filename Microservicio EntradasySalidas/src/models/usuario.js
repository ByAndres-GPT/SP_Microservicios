import Sequelize from 'sequelize';
import sequelize from '../database/db.js';

// modelo usuario
const Usuario = sequelize.define('usuarios', {
    ID_USUARIO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOMBRE: {
        type: Sequelize.STRING,
    },
    APELLIDO: {
        type: Sequelize.STRING,
    },
    CORREO: {
        type: Sequelize.STRING,
        unique: true,
    },
    CONTRASENIA: {
        type: Sequelize.STRING,
    },
    ID_ROL: {
        type: Sequelize.INTEGER,
    },
});
export default Usuario;