const mysql = require('mysql2');
const config = require('../../config');

const conn = mysql.createConnection(config.mysql);

conn.connect((error) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  console.log('Base de Datos conectado correctamente');
});

module.exports = conn;