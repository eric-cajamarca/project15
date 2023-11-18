var express = require('express');
var api = express.Router();
var adminController = require('../controllers/adminController');
var auth  = require('../middlewares/autenticate');

// Rutas para el CRUD de ventas
api.get('/admin',auth.auth, adminController.getAdmin);
api.post('/admin_login', adminController.admin_login);
api.post('/admin', adminController.createAdmin);
api.put('/admin/:id', adminController.updateAdmin);

//api.delete('/admin/:id', adminController.deleteAdmin);

module.exports = api;
