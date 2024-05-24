import { Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize({
  dialect: 'oracle',
  username: 'admin',
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialectOptions: {
    connectString: config.DB_CONNECTION_STRING,
  },
});

export default sequelize;
