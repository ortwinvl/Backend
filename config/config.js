/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

module.exports = {
  development: {
    dialect: 'mssql',
    dialectOptions: { 
      instanceName: "SQLEXPRESS",
      options: { encrypt: true }
    },
    database: process.env.SQL_DATABASE || 'WTCApp',
    username: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PWD || 'Development123456!',
    host: process.env.SQL_SERVER || 'localhost',
    port: parseInt(process.env.SQL_PORT || '1433'),
   
  },
  test: {
    dialect: 'mssql',
    database: process.env.SQL_DATABASE || 'WTCApp',
    username: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PWD || 'Development123456!',
    host: process.env.SQL_SERVER || 'localhost',
    port: parseInt(process.env.SQL_PORT || '1433'),
  },
  production: {
    dialect: 'mssql',
    database: process.env.SQL_DATABASE || 'WTCApp',
    username: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PWD || 'Development123456!',
    host: process.env.SQL_SERVER || 'localhost',
    port: parseInt(process.env.SQL_PORT || '1433'),
  }
}