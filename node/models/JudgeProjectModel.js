// Import the necessary modules
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const JudgeProjectModel = db.define('judge_projects', {
    id_person: { 
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    id_project: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

export default JudgeProjectModel;
