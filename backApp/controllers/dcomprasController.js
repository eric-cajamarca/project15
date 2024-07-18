const sql = require('mssql');
const dbConfig = require('../dbconfig');

// create table DetalleCompras
// (
// idDetalleCompra int identity(1,1) primary key not null,
// idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
// idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal), -- Nueva columna
// idCompra int not null,
// cantidad decimal(18,3) not null,
// idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
// idPresentacion int not null,
// pUnitario decimal(18,5),
// total decimal(18,2),
// idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
// )

const obtener_detalle_compras_idcompra = async function (req, res) {
    const idCompra = req.params.id;
    console.log('obtener_detalle_compras_idcompra: ', idCompra);
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let detallecompras = await pool
                    .request()
                    .input('idCompra', sql.UniqueIdentifier, idCompra)
                    //quiero conssultar el detalle de una compra con idcompra trayendo los datos de las columnas relacionadas con inner join idSucursal, idProducto, idPresentacion y idUsuario
                    //.query("SELECT * FROM DetalleCompras INNER JOIN Productos ON DetalleCompras.idProducto = Productos.idProducto WHERE idCompra = @idCompra");

                    .query("SELECT * FROM DetalleCompras  WHERE idCompra = @idCompra");


                res.status(200).send({ data: detallecompras.recordset });
            } catch (error) {
                console.log('obterner detallecompras error: ' + error);
                res.status(500).send({ message: 'Error al obtener los detallecompras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const crear_detalle_compras_idcompra = async function (req, res) {

    const { idSucursal, idCompra, cantidad, idProducto, idPresentacion, pUnitario, total } = req.body;
    console.log('crear_detalle_compras_idcompra: ', req.body);

    const idUsuario = req.user.sub;
    const idEmpresa = req.user.empresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                // Formatear pUnitario a dos decimales
                const pUnitarioFormateado = parseFloat(pUnitario);

                console.log('pUnitarioFormateado: ', pUnitarioFormateado);

                let pool = await sql.connect(dbConfig);
                let detalleCompra = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                    .input('idCompra', sql.UniqueIdentifier, idCompra)
                    .input('cantidad', sql.Decimal(18, 3), cantidad)
                    .input('idProducto', sql.UniqueIdentifier, idProducto)
                    .input('idPresentacion', sql.Int, idPresentacion)
                    .input('pUnitario', sql.Decimal(18, 5), pUnitarioFormateado)
                    .input('total', sql.Decimal(18, 2), total)
                    .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                    .query("INSERT INTO DetalleCompras (idEmpresa, idSucursal, idCompra, cantidad, idProducto, idPresentacion, pUnitario, total, idUsuario) VALUES (@idEmpresa, @idSucursal, @idCompra, @cantidad, @idProducto, @idPresentacion, @pUnitario, @total, @idUsuario)");

                res.status(200).send({ data: detalleCompra.rowsAffected });

            } catch (error) {
                console.log('crear detallecompras error: ' + error);
                res.status(500).send({ message: 'Error al crear detallecompras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const editar_detalle_compras_idcompra = async (req, res) => {
    console.log('editar_detalle_compras_idcompra reqbody: ', req.body);
    console.log('editar_detalle_compras_idcompra: reqparams', req.params);
    //const {idDetalleCompra, idEmpresa, idSucursal, cantidad, idProducto, idPresentacion, pUnitario, total, idUsuario } = req.body;

    const idCompra = req.params.id;
    
    
    console.log('producto en editar_detalle_compras_idcompra: ', productos);

    let DetalleCompra = [];
    req.body.forEach(element => {
        var detalleCompra = element;
        DetalleCompra.push(detalleCompra);
    });

    console.log('DetalleCompra en editar_detalle_compras_idcompra ', DetalleCompra);

    
    // const productos = DetalleCompra.map(compra => compra.producto);
    // Extracción de productos con campos adicionales
    const productos = DetalleCompra.map(compra => {
        const { producto, idDetalleCompra, idSucursal, idCompra } = compra;
        return {
            ...producto,
            idDetalleCompra,
            idSucursal,
            idCompra
        };
    });

    //ahora quiero recorrer el array DetalleCompra y hacer un update de cada uno de los elementos
    
    

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {

                let pool = await sql.connect(dbConfig);
                let detalleCompra = await pool
                .request()
                .input('idDetalleCompra', sql.Int, idDetalleCompra)
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idCompra', sql.UniqueIdentifier, idCompra)
                .input('cantidad', sql.Decimal(18,3), cantidad)
                .input('idProducto', sql.UniqueIdentifier, idProducto)
                .input('idPresentacion', sql.Int, idPresentacion)
                .input('pUnitario', sql.Decimal(18,5), pUnitario)
                .input('total', sql.Decimal(18,2), total)
                .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                .query("UPDATE DetalleCompras SET idEmpresa = @idEmpresa, idSucursal = @idSucursal, cantidad = @cantidad, idProducto = @idProducto, idPresentacion = @idPresentacion, pUnitario = @pUnitario, total = @total, idUsuario = @idUsuario WHERE idDetalleCompra = @idDetalleCompra and idCompra = @idCompra");

                res.status(200).send({  data: detalleCompra.rowsAffected });

            } catch (error) {
                console.log('crear detallecompras error: ' + error);
                res.status(500).send({ message: 'Error al crear detallecompras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}


module.exports = {
    obtener_detalle_compras_idcompra,
    crear_detalle_compras_idcompra,
    editar_detalle_compras_idcompra

}