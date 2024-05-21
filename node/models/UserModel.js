// models/User.js
import { DataTypes } from 'sequelize';
import db from '../database/db.js'; 

export const PersonModel = db.define('Person', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING }, // CLOB puede ser representado como STRING con un límite alto en Sequelize
  email: { type: DataTypes.STRING }
  // Define other columns as needed
}, {
    tableName: 'persons'
});

export const StudentModel = db.define('Student', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  enrollment: {type: DataTypes.STRING}
}, {
  tableName: 'students'
});

export const AdminModel = db.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, {
  tableName: 'admins'
});

