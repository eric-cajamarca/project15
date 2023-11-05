// dbConfig.js
const config = {
    user: 'sa',
    password: '12345',
    server: 'DESKTOP-K7G3N2Q',
    database: 'sistema',
    options: {
      encrypt: true, // Si estás usando Azure, debes establecer esto en true
      trustServerCertificate: true, // Cambia esto según tus necesidades
    },
  };
  
  module.exports = config;
  