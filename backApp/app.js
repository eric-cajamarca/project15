const express = require('express');
var bodyparser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./dbConnection'); // Asegúrate de que la importación sea correcta

const detalleVentasRoutes = require('./routes/detalleventas'); // Importa el enrutador de detalleventas
const adminRoutes = require('./routes/admin');
const cventasRoutes = require('./routes/cventas');
const renviosRouters = require('./routes/renvios');
const empresaRouters = require('./routes/empresa');
const comprobantesRoutes = require('./routes/comprobantes');
const programacionRoutes = require('./routes/programacion');
const rolRoutes = require('./routes/rol');

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
// app.use(express.json());
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

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


// Escuchar en el puerto
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT);
});