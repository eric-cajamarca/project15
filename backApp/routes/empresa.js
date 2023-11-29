const express = require('express');
const api = express.Router();
const empresasController = require('../controllers/empresasController');
var auth  = require('../middlewares/autenticate');

// Rutas CRUD para la tabla

// CREATE
// api.post('/empresa',auth.auth, empresasController.createEmpresa);

// READ
api.get('/empresa', auth.auth, empresasController.getEmpresas);
api.get('/empresa/:id',auth.auth, empresasController.getEmpresasById);

// UPDATE
// api.put('/empresa/:id', empresasController.updateEmpresa);

// DELETE
// api.delete('/empresa/:id', empresasController.deleteCompVenta);

module.exports = api;