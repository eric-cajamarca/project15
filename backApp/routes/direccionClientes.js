var express = require('express');
var api = express.Router();
var direccionClientesController = require('../controllers/direccionClientesController');
var auth  = require('../middlewares/autenticate');

// Rutas para el CRUD de direccionClientes
api.get('/direccionClientes',auth.auth, direccionClientesController.listarDireccionClientes);
api.post('/direccionClientes',auth.auth, direccionClientesController.crearDireccionCliente);
api.put('/direccionClientes/:idDireccionCliente',auth.auth, direccionClientesController.actualizarDireccionCliente);
api.delete('/direccionClientes/:idDireccionCliente',auth.auth, direccionClientesController.eliminarDireccionCliente);

module.exports = api;
