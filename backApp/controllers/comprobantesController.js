const sql = require('mssql');
const dbConfig = require('../dbconfig');

async function obtener_comprobantes(req, res) {
    console.log('aqui entro a obtener comprobantes');
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Comprobantes');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
}

async function obtenerComprobantes_alias(req, res) {
    console.log('aqui entro a obtener comprobantes');
    let alias = req.params.id;

    console.log('alias', alias);
    console.log('params', req.params);

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Comprobantes'+alias+' where id = 15');

        console.log('resultado del result', result.recordset);
        res.json(result.recordset);

    } catch (error) {
        console.error('Error al obtener los comprobantes:', error);
        res.status(500).send('Error al obtener los comprobantes');
    }

}


module.exports = {
    obtener_comprobantes,
    obtenerComprobantes_alias

};