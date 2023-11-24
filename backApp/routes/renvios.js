const express = require('express');
const api = express.Router();
const rEnviosController = require('../controllers/renviosController');

// Rutas CRUD
api.get('/envios', rEnviosController.obtenerEnvios);
// CREATE
api.post('/envios/', rEnviosController.createCompEnvio);

// READ
api.get('/envios/:id', rEnviosController.getCompEnvio);
    

// // UPDATE
api.put('/envios/:id', rEnviosController.updateCompEnvio);

// // DELETE
 api.delete('/envios/:id', rEnviosController.deleteCompEnvio);

module.exports = api;