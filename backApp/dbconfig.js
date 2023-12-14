// dbConfig.js
const config = {
    user: 'fenix',
    password: '1234',
    server: '192.168.2.105',
    database: 'grupoSJB',
    options: {
      encrypt: true, // Si estás usando Azure, debes establecer esto en true
      trustServerCertificate: true, // Cambia esto según tus necesidades
    },
  };
  
  module.exports = config;
  