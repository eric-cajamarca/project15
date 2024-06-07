const express = require('express');
const api = express.Router();

var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/configuraciones'});
const empresasController = require('../controllers/empresasController');
var auth  = require('../middlewares/autenticate');

// Rutas CRUD para la tabla

   
    // createEmpresa,
    // updateEmpresa,
    // cambiar_estado_empresa,
    // deleteAdmin,
  
    // cambiar_estado_colaborador_admin,
    // obtener_datos_colaborador_admin,
    // getEmpresasById

// CREATE
// api.post('/empresa',auth.auth, empresasController.createEmpresa);

// READ
api.get('/empresa', auth.auth, empresasController.getEmpresas);
api.get('/empresa/:id',auth.auth, empresasController.getEmpresasById);
api.post('/empresa', empresasController.createEmpresa);
api.put('/empresa/:id',[auth.auth,path], empresasController.updateEmpresa);
api.put('/cambiar_estado_empresa/:id',auth.auth, empresasController.cambiar_estado_empresa);

// getDireccionEmpresa_id,
//     createDireccionEmpresa,
//     updateDireccionEmpresa

api.get('/direccion_empresa/:id',auth.auth, empresasController.getDireccionEmpresa_id);
api.post('/direccion_empresa',auth.auth, empresasController.createDireccionEmpresa);
api.put('/direccion_empresa/:id',auth.auth, empresasController.updateDireccionEmpresa);

// UPDATE
// api.put('/empresa/:id', empresasController.updateEmpresa);

// DELETE
// api.delete('/empresa/:id', empresasController.deleteCompVenta);

module.exports = api;