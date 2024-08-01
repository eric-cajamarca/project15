const express = require('express');
var bodyparser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./dbConnection'); // Asegúrate de que la importación sea correcta
const xss = require('xss');


const detalleVentasRoutes = require('./routes/detalleventas'); // Importa el enrutador de detalleventas
const adminRoutes = require('./routes/admin');
const cventasRoutes = require('./routes/cventas');
const renviosRouters = require('./routes/renvios');
const empresaRouters = require('./routes/empresa');
const comprobantesRoutes = require('./routes/comprobantes');
const programacionRoutes = require('./routes/programacion');
const rolRoutes = require('./routes/rol');
const clientesRoutes = require('./routes/clientes');
const direccionClientesRoutes = require('./routes/direccionClientes');
const documentosRoutes = require('./routes/documentos');
const productosRoutes = require('./routes/productos');
const comprasRoutes = require('./routes/compras');
const dcomprasRoutes = require('./routes/dcompras');
const sucursalRoutes = require('./routes/sucursal');
const tablasSunatRoutes = require('./routes/tablasSunat');
const categoriaRoutes = require('./routes/categoria');
const presentacionRoutes = require('./routes/presentacion');
const marcaRoutes = require('./routes/marcas');
const unidporcajaRoutes = require('./routes/unidporcaja');
const preciosVRoutes = require('./routes/preciosV');


const PORT = process.env.PORT || 3000;
const app = express();


// Ruta de conexión a la base de datos
app.get('/database', async (req, res) => {
  try {
    await connectDB();
    console.log('Conexión exitosa a la base de datos');
    res.send('¡Conexión exitosa a la base de datos!');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('¡Error al conectar a la base de datos!');
  }
});


// Middleware para manejar JSON

app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

// Middleware para sanitizar el cuerpo de la solicitud
// app.use((req, res, next) => {
//   // Sanitizar campos del cuerpo de la solicitud
//   if (req.body) {
//     Object.keys(req.body).forEach(key => {
//       req.body[key] = xss(req.body[key]);
//     });
//   }
//   next();
// });


app.use(cors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Access-Control-Allow-Request-Method'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  }));

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});


// Monta el enrutador de detalleventas en la ruta /api
app.use('/api', detalleVentasRoutes);
app.use('/api', adminRoutes);
app.use('/api', cventasRoutes);
app.use('/api',renviosRouters);
app.use('/api', empresaRouters);
app.use('/api', comprobantesRoutes);
app.use('/api', programacionRoutes);
app.use('/api', rolRoutes);
app.use('/api', clientesRoutes);
app.use('/api', direccionClientesRoutes);
app.use('/api', documentosRoutes);
app.use('/api', productosRoutes);
app.use('/api', comprasRoutes);
app.use('/api', dcomprasRoutes);
app.use('/api', sucursalRoutes);
app.use('/api', tablasSunatRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', presentacionRoutes);
app.use('/api', marcaRoutes);
app.use('/api', unidporcajaRoutes);
app.use('/api', preciosVRoutes);

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT);
});