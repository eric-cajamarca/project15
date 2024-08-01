const sql = require('mssql');
const dbConfig = require('../dbconfig');


// create table PreciosV
// (
// idPreciosV int identity (1,1) not null,
// idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto) not null,
// cUnitario decimal(18,4) null,
// mayorista decimal(18,4) null,
// cliente decimal(18,4) null,
// transeunte decimal(18,4) null,

// )
// go

//crear un registro en PreciosV
const crearPrecioV = async function (detalle) {
    

    if (req.user) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idProducto', sql.UniqueIdentifier, detalle.idProducto)
                .input('cUnitario', sql.Decimal(18, 4), detalle.pUnitario)
                .input('mayorista', sql.Decimal(18, 4), 0)
                .input('cliente', sql.Decimal(18, 4), 0)
                .input('transeunte', sql.Decimal(18, 4), 0)
                .query(`INSERT INTO PreciosV (idProducto, cUnitario, mayorista, cliente, transeunte) VALUES (@idProducto, @cUnitario, @mayorista, @cliente, @transeunte)`);
            res.status(200).send({ data: result });
        } catch (error) {
            console.error('Error al crear el precio:', error);
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(401).send({ message: 'No Access', data: undefined });
    }
}

//obtener un precio por su id
const obtenerPrecioV = async function (req, res) {
    console.log('req.params', req.params.id);
    const idPrecioV = req.params.id;
    if (req.user) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idPrecioV', sql.Int, idPrecioV)
                .query(`SELECT * FROM PreciosV WHERE idPreciosV = @idPrecioV`);
            res.status(200).send({ data: result.recordset });
        } catch (error) {
            console.error('Error al obtener el precio:', error);
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(401).send({ message: 'No Access', data: undefined });
    }
}

//obtener todos los precios
const obtenerPreciosV = async function (req, res) {
    if (req.user) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .query(`SELECT * FROM PreciosV`);
            res.status(200).send({ data: result.recordset });
        } catch (error) {
            console.error('Error al obtener los precios:', error);
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(401).send({ message: 'No Access', data: undefined });
    }
}

//actualizar un precio
const actualizarPrecioV = async function (req, res) {
    const { idPreciosV, idProducto, cUnitario, mayorista, cliente, transeunte } = req.body;
    if (req.user) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idPreciosV', sql.Int, idPreciosV)
                .input('idProducto', sql.UniqueIdentifier, idProducto)
                .input('cUnitario', sql.Decimal(18, 4), cUnitario)
                .input('mayorista', sql.Decimal(18, 4), mayorista)
                .input('cliente', sql.Decimal(18, 4), cliente)
                .input('transeunte', sql.Decimal(18, 4), transeunte)
                .query(`UPDATE PreciosV SET idProducto = @idProducto, cUnitario = @cUnitario, mayorista = @mayorista, cliente = @cliente, transeunte = @transeunte WHERE idPreciosV = @idPreciosV`);
            res.status(200).send({ data: result });
        } catch (error) {
            console.error('Error al actualizar el precio:', error);
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(401).send({ message: 'No Access', data: undefined });
    }
}


module.exports = {
    // crearPrecioV,
    obtenerPrecioV,
    obtenerPreciosV,
    actualizarPrecioV
}