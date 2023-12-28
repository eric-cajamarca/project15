var express = require('express');
var api = express.Router();
var sucursalController = require('../controllers/sucursalController');
var auth  = require('../middlewares/autenticate');

api.get('/sucursal',auth.auth, sucursalController.obtener_sucursal_todos);
api.get('/sucursalempresa/',auth.auth, sucursalController.obtener_sucursal_idempresa);
api.post('/sucursal', auth.auth, sucursalController.crear_sucursal_idEmpresa);
api.put('/sucursal/:id',auth.auth, sucursalController.editar_sucursal_idEmpresa);
api.delete('/sucursal/:id',auth.auth, sucursalController.eliminar_sucursal_idempresa);

//////////////////////////////////////////////////////////////////////////////////////////
api.get('/stocksucursal',auth.auth, sucursalController.obtener_stock_sucursal_idProducto);

module.exports = api;
