import { Sequelize } from 'sequelize'
import { SQL_USER, SQL_PWD, SQL_SERVER, SQL_PORT, SQL_DATABASE } from './config';

const db: Sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PWD, {
  host: SQL_SERVER,
  port: Number(SQL_PORT),
  dialect: 'mssql',
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  },
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      // enableArithAbort: false,
      // cryptoCredentialsDetails: {
      //   minVersion: 'TLSv1'
      // }
    }
  },
  define:{
    underscored: true,
    timestamps: false
  }
});

export default db
