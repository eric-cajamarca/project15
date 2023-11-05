const sql = require('mssql');
const dbConfig = require('../dbconfig');


async function obtenerDetalleVentas(req, res) {

  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM DetalleVentas');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener detalle de ventas:', error);
    res.status(500).send('Error al obtener  detalle de ventas');
  }
}

async function obtenerDetalleVentaPorId(req, res) {
  const CompVentas = req.params.id; // Cambia el nombre de la variable a compVentas
  console.log('req.params.id');
  console.log(req.params.id);
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input('CompVentas', sql.Char, CompVentas) // Cambia el tipo de dato a sql.VarChar si compVentas es una cadena de texto
      .query('SELECT * FROM DetalleVentas WHERE CompVentas = @CompVentas'); // Cambia el nombre del campo a compVentas
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).send('Error al obtener la venta');
  }
}


// async function actualizarDetalleVenta(req, res) {
//   const { id, CantEntregado } = req.body;
//   console.log('req.body');
//   console.log(id);
//   console.log(req.body);

//   if (parseFloat(CantEntregado) >= 0 ) {
//     console.log('la cantidad es mayor que 0');


//   }else {
//     console.log('la cantidad es menor que 0');
//     res.status(400).json({ message: 'La cantidad entregado no debe ser menor a 0' });
//   }

//   try {


//     let pool = await sql.connect(dbConfig);
//     let result = await pool
//       .request()
//       .input('id', sql.Int, id)

//       .input('CantEntregado', sql.Decimal, CantEntregado)
//       .query('UPDATE DetalleVentas SET CantEntregado = @CantEntregado WHERE Id = @id');

//     res.status(200).json({ message: 'Registro actualizado correctamente' });

//   } catch (error) {
//     console.error('Error al actualizar el detalle de venta:', error);
//     res.status(500).send('Error al actualizar el detalle de venta');

//   }

// }

async function actualizarDetalleVenta(req, res) {
  const { id, CantEntregado } = req.body;
  // console.log('req.body');
  // console.log(id);
  // console.log(req.body);

  if (parseFloat(CantEntregado) >= 0 ) {
    // console.log('la cantidad es mayor que 0');

    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('CantEntregado', sql.Decimal, CantEntregado)
        .query('UPDATE DetalleVentas SET CantEntregado = @CantEntregado WHERE Id = @id');

      res.status(200).json({ message: 'Registro actualizado correctamente' });

    } catch (error) {
      console.error('Error al actualizar el detalle de venta:', error);
      res.status(500).send('Error al actualizar el detalle de venta');
    }

  } else {
    console.log('la cantidad es menor que 0');
    res.status(400).json({ message: 'La cantidad entregada no debe ser menor a 0' });
  }
}


// async function eliminarDetalleVenta(req, res) {
//   const id = req.params.id; // Asegúrate de obtener el ID del registro a eliminar
//   console.log(id);

//   try {
//     let pool = await sql.connect(dbConfig);
//     let result = await pool
//       .request()
//       .input('id', sql.Int, id) // Asegúrate de usar el tipo de dato adecuado para el campo id
//       .query('DELETE FROM DetalleVentas WHERE id = @id'); // Asegúrate de reemplazar 'id' con el nombre del campo ID en tu tabla

//     res.json({ message: 'Registro eliminado correctamente' });
//   } catch (error) {
//     console.error('Error al eliminar el detalle de venta:', error);
//     res.status(500).send('Error al eliminar el detalle de venta');
//   }
// }

async function eliminarDetalleVenta(req, res) {
  const id = req.params.id; // Asegúrate de obtener el ID del registro a eliminar
  console.log(id);

  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input('id', sql.Int, id) // Asegúrate de usar el tipo de dato adecuado para el campo id
      .query('SELECT * FROM DetalleVentas WHERE id = @id'); // Buscar el registro con el ID proporcionado

    if (result.recordset.length === 0) { // Si no se encuentra ningún registro con el ID dado
      return res.status(404).json({ message: 'El registro no existe' });
    } else { // Si se encuentra el registro
      let deleteResult = await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM DetalleVentas WHERE id = @id'); // Asegúrate de reemplazar 'id' con el nombre del campo ID en tu tabla

      res.json({ message: 'Registro eliminado correctamente' });
    }
  } catch (error) {
    console.error('Error al eliminar el detalle de venta:', error);
    res.status(500).send('Error al eliminar el detalle de venta');
  }
}


// Agrega los métodos restantes para crear, actualizar y eliminar ventas

module.exports = {
  obtenerDetalleVentas,
  obtenerDetalleVentaPorId,
  actualizarDetalleVenta,
  eliminarDetalleVenta,

};
