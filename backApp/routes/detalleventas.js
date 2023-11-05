const express = require('express');
const api = express.Router();
const dventasController = require('../controllers/dventasController');

// Rutas para el CRUD de ventas
api.get('/ventas', dventasController.obtenerDetalleVentas);
api.get('/ventas/:id', dventasController.obtenerDetalleVentaPorId);
// api.post('/ventas', ventasController.crearVenta);
api.put('/ventas/:id', dventasController.actualizarDetalleVenta);
api.delete('/ventas/:id', dventasController.eliminarDetalleVenta);

module.exports = api;
