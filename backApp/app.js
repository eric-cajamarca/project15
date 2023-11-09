const express = require('express');
var bodyparser = require('body-parser');
const { connectDB } = require('./dbConnection'); // Asegúrate de que la importación sea correcta

const detalleVentasRoutes = require('./routes/detalleventas'); // Importa el enrutador de detalleventas
const adminRoutes = require('./routes/admin');
const cventasRoutes = require('./routes/cventas');
const renviosRouters = require('./routes/renvios');

const PORT = process.env.PORT || 3000;
const app = express();


// Middleware para manejar JSON
// app.use(express.json());
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Hola desde tu servidor Node.js!');
});

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

// Monta el enrutador de detalleventas en la ruta /api
app.use('/api', detalleVentasRoutes);
app.use('/api', adminRoutes);
app.use('/api', cventasRoutes);
app.use('/api',renviosRouters);

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT);
});