const sql = require('mssql');
const dbConfig = require('../dbconfig');


// CREATE
// const createCompVenta = async (compVenta) => {
//   try {
//     let pool = await sql.connect(dbConfig);
//     let result = await pool
//       .request()
//       .input('Serie_Numero', sql.Char(13), compVenta.Serie_Numero)
//       .input('IdDoc', sql.Char(2), compVenta.IdDoc)
//       // ... completar con otras entradas

//       .query(
//         'INSERT INTO Comp_Ventas (Serie_Numero, IdDoc, SerieDoc, NumeroDoc, F_Emision, F_Vencimiento, @TipoDoc, @Ruc_Dni, @Razon_Social, Moneda, CondicionPago, SubTotal, Igv, Exonerado, Gratuito, Icbper, OtrosCargos, Descuentos, Total, Estado, EstadoPedido, EstadoSunat, CompRelacionado) VALUES (@Serie_Numero, @IdDoc, @SerieDoc, @NumeroDoc, @F_Emision, @F_Vencimiento, @TipoDoc, @Ruc_Dni, @Razon_Social, @Moneda, @CondicionPago, @SubTotal, @Igv, @Exonerado, @Gratuito, @Icbper, @OtrosCargos, @Descuentos, @Total, @Estado, @EstadoPedido, @EstadoSunat, @CompRelacionado)'
//       );
//     return result;
//   } catch (error) {
//     throw new Error('Error al crear la venta');
//   }
// };

// READ
const getCompVentaById = async function(req,res){
    const Serie_Numero = req.params.id;

    console.log('serieNumero');
    console.log(req.params);
    console.log(Serie_Numero);
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
    .request()
    .input('Serie_Numero',sql.Char, Serie_Numero)
    .query('SELECT * FROM Comp_Ventas WHERE Serie_Numero = @Serie_Numero');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).send('Error al obtener la venta por id');
  }

};


// UPDATE
const updateCompVenta = async function(req,res){
    const { Serie_Numero, Estado, EstadoPedido, EstadoSunat } = req.body;
    // const Serie_Numero = req.params.id;

    console.log('estado', Estado);
    console.log('Estadopedido', EstadoPedido);
    console.log('estado sunat', EstadoSunat);

  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input('Serie_Numero', sql.VarChar, Serie_Numero)
      .input('Estado', sql.VarChar, Estado)
      .input('EstadoPedido', sql.VarChar, EstadoPedido)
      .input('EStadoSunat', sql.VarChar, EstadoSunat)
      // ... completar con otras entradas

      .query('UPDATE Comp_VentasTienda01 SET Estado = @Estado, EstadoPedido = @EstadoPedido, EstadoSunat = @EstadoSunat WHERE Serie_Numero = Serie_Numero');
      res.status(200).json({ message: 'Registro actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el detalle de venta:', error);
    res.status(500).send('Error al actualizar el detalle de venta');
  }


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
};

// DELETE
const deleteCompVenta = async function(req,res){
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`DELETE FROM Comp_Ventas WHERE id = ${id}`);
    return result;
  } catch (error) {
    throw new Error('Error al eliminar la venta');
  }
};

// Exportar las funciones
module.exports = { 
    // createCompVenta, 
    getCompVentaById, 
    updateCompVenta, 
    deleteCompVenta
};

