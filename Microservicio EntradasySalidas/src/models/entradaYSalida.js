import Sequelize from 'sequelize';
import sequelize from '../database/db.js';

// modelo entradas y salidas
const EntradaSalida = sequelize.define('entradas_y_salidas', {
    ID_ENTRADA_SALIDA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FECHA_ENTRADA: {
        type: Sequelize.DATEONLY,        
    },
    FECHA_SALIDA: {
        type: Sequelize.DATEONLY,
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
export default EntradaSalida;