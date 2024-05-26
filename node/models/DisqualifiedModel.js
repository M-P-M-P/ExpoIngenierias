import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const DisqualifiedModel = db.define('project_disqualified', {
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'admins',
            key: 'id'
        }
    },
    reason: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true 
});

export default DisqualifiedModel;
