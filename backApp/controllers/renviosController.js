const sql = require('mssql');
const dbConfig = require('../dbconfig');

const obtenerEnvios = async (req, res) => {
    console.log('aqui entro a obtener envios');
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Historialpedidos');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

const getCompEnvio = async function (req, res) {
    const codicion = req.params.id;

    console.log('getcodicion');
    console.log(req.params);
    console.log(codicion);
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool
            .request()
            .input('codicion', sql.VarChar, codicion)
            .query('SELECT * FROM Historialpedidos WHERE CompEnvio = @codicion or CompVentas = @codicion or FEnvio = @codicion');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener la venta:', error);
        res.status(500).send('Error al obtener la venta por id');
    }

};


const createCompEnvio = async (req, res) => {
    let data = req.body;

    console.log('createCompEnvio: data:', req.body);
    //const pool = await sql.connect(dbConfig);

    // Verificar si el correo electrónico ya existe
    // const checkEmailQuery = await pool
    //     .request()
    //     .input('CompEnvio', sql.VarChar, CompEnvio)
    //     .input('CompVentas', sql.VarChar, CompVentas)
    //     .input('FEnvio', sql.VarChar, FEnvio)
    //     .input('Descripcion', sql.VarChar, Descripcion)
    //     .input('Presentacion', sql.VarChar, Presentacion)
    //     .input('Cantidad', sql.Decimal, Cantidad)
    //     .query('SELECT * FROM Historialpedidos WHERE CompEnvio = @CompEnvio');

    // if (checkEmailQuery.recordset.length > 0) {
    //     return res.status(400).json({ message: 'El comprobante ya existe.' });
    // } else {
    //     try {

    //         const pool = await sql.connect(dbConfig);
    //         const result = await pool
    //             .request()
    //             .input('CompEnvio', sql.VarChar, CompEnvio)
    //             .input('CompVentas', sql.VarChar, CompVentas)
    //             .input('FEnvio', sql.VarChar, FEnvio)
    //             .input('Descripcion', sql.VarChar, Descripcion)
    //             .input('Presentacion', sql.VarChar, Presentacion)
    //             .input('Cantidad', sql.Decimal, Cantidad)
    //             .query('INSERT INTO Historialpedidos (CompEnvio, CompVentas, FEnvio, Descripcion, Presentacion, Cantidad) VALUES (@CompEnvio, @CompVentas, @FEnvio, @Descripcion, @Presentacion, @Cantidad)');
    //         res.json({ message: 'Registro guardado correctamente' });
    //     } catch (error) {
    //         console.error('Error al crear el registro:', error);
    //         res.status(500).send('Error al crear el registro');
    //     }
    // }


};

const updateCompEnvio = async (req, res) => {
    //   const { name, apellidos, email, password, rol, estado } = req.body;
    const { CompVentas, FEnvio, Descripcion, Presentacion, Cantidad } = req.body;
    const  CompEnvio = req.params.id;

    console.log(CompEnvio);

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('CompEnvio', sql.VarChar, CompEnvio)
            .input('CompVentas', sql.VarChar, CompVentas)
            .input('FEnvio', sql.VarChar, FEnvio)
            .input('Descripcion', sql.VarChar, Descripcion)
            .input('Presentacion', sql.VarChar, Presentacion)
            .input('Cantidad', sql.Decimal, Cantidad)
            .query('UPDATE Historialpedidos SET  FEnvio = @FEnvio, Descripcion = @Descripcion, Presentacion = @Presentacion, Cantidad = @Cantidad WHERE CompEnvio = @CompEnvio');
        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el registro:', error);
        res.status(500).send('Error al actualizar el registro');
    }
};

const deleteCompEnvio = async function (req, res) {
    const codicion = req.params.id;
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool
            .request()
            .input('codicion', sql.VarChar, codicion)
            .query('DELETE FROM Historialpedidos WHERE CompEnvio = @codicion');
        res.json({ message: 'El registro se eliminó correctamente' });
    } catch (error) {
        console.error('Error al eliminar el registro de envio :', error);
        res.status(500).send('Error al eliminar el registro');
    }
};


module.exports = {
    obtenerEnvios,
    getCompEnvio,
    createCompEnvio,
    deleteCompEnvio,
    updateCompEnvio

};

