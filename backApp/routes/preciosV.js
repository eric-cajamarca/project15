var express = require('express');
var api = express.Router();
var preciosVController = require('../controllers/preciosVController');
var auth  = require('../middlewares/autenticate');


// crearPrecioV,
//     obtenerPrecioV,
//     obtenerPreciosV,
//     actualizarPrecioV

//api.post('/preciosV',auth.auth, preciosVController.crearPrecioV);
api.get('/preciosV/:id',auth.auth, preciosVController.obtenerPrecioV);
api.get('/preciosV',auth.auth, preciosVController.obtenerPreciosV);
api.put('/preciosV/:id',auth.auth, preciosVController.actualizarPrecioV);


module.exports = api;