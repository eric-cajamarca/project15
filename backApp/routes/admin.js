const express = require('express');
const api = express.Router();
const adminController = require('../controllers/adminController');

// Rutas para el CRUD de ventas
api.get('/admin', adminController.getAdmin);
api.post('/loginadmin', adminController.getAdminLogin);
api.post('/admin', adminController.createAdmin);
api.put('/admin/:id', adminController.updateAdmin);
//api.delete('/admin/:id', adminController.deleteAdmin);

module.exports = api;
