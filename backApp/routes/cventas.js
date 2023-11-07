const express = require('express');
const api = express.Router();
const cventasController = require('../controllers/cventasController');

// Rutas CRUD para la tabla Comp_Ventas

// CREATE
//api.post('/', cventasController.createCompVenta);

// READ
api.get('/cventas/:id', cventasController.getCompVentaById);

// UPDATE
api.put('/cventas/:id', cventasController.updateCompVenta);

// DELETE
api.delete('/cventas/:id', cventasController.deleteCompVenta);

module.exports = api;