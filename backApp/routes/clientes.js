var express = require('express');
var api = express.Router();
var clientesController = require('../controllers/clientesController');
var auth  = require('../middlewares/autenticate');

// Rutas para el CRUD de clientes
api.get('/clientes',auth.auth, clientesController.listarClientes);
api.post('/clientes',auth.auth, clientesController.crearCliente);
api.put('/clientes/:idCliente',auth.auth, clientesController.actualizarCliente);
api.delete('/clientes/:idCliente',auth.auth, clientesController.eliminarCliente);

module.exports = api;


