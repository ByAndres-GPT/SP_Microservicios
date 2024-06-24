import Sequelize from 'sequelize';
import sequelize from '../database/db.js';

// modelo sala
const Sala = sequelize.define('salas', {
    ID_SALA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    NOMBRE: {
        type: Sequelize.STRING,
    },
    DESCRIPCION: {
        type: Sequelize.STRING,
    },
    ESTADO: {
        type: Sequelize.ENUM('vacio', 'ocupado'),
        defaultValue: 'vacio',
    },
});
export default Sala;