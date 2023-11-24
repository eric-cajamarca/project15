const express = require('express');
const api = express.Router();
const dventasController = require('../controllers/dventasController');
var auth  = require('../middlewares/autenticate');

// Rutas para el CRUD de ventas
api.get('/ventas', dventasController.obtenerDetalleVentas);
api.get('/dventas/:id', auth.auth, dventasController.obtenerDetalleVentaPorId);
// api.post('/ventas', ventasController.crearVenta);
api.put('/ventas/:id', dventasController.actualizarDetalleVenta);
api.delete('/ventas/:id', dventasController.eliminarDetalleVenta);

module.exports = api;
