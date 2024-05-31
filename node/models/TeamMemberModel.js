// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const TeamMemberModel = db.define('team_members', {
    id_team: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'teams',
            key: 'id'
        }
    },
    id_member: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'students',
            key: 'id'
        }
    }
}, {
    timestamps:false,
    tableName: 'team_members'
});

// Exportar el modelo
export default TeamMemberModel;
