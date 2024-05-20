import config from '../config.js'
import { Sequelize } from "sequelize";
import oracledb from 'oracledb';

const db = new Sequelize({
    dialect: 'oracle',
    username: 'ADMIN',
    password: 'uj@@FpVFwkZ7Uvn',
    dialectOptions: {   
        connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=g10e8bcafdb4ced_nctc1obxti1z34rl_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))',
        dialectModule: oracledb
    },
    logging: console.log
});




export default db