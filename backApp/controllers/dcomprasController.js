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

const obtener_detalle_compras_idcompra = async function (req, res){
    const idCompra = req.params.id;
    console.log('obtener_detalle_compras_idcompra: ' , idCompra);
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let detallecompras = await pool
                .request()
                .input('idCompra', sql.UniqueIdentifier, idCompra)
                //quiero conssultar el detalle de una compra con idcompra trayendo los datos de las columnas relacionadas con inner join idSucursal, idProducto, idPresentacion y idUsuario
                .query("SELECT * FROM DetalleCompras INNER JOIN Sucursal ON DetalleCompras.idSucursal = Sucursal.idSucursal INNER JOIN Productos ON DetalleCompras.idProducto = Productos.idProducto INNER JOIN Presentacion ON DetalleCompras.idPresentacion = Presentacion.idPresentacion INNER JOIN UsuarioWeb ON DetalleCompras.idUsuario = UsuarioWeb.idUsuario WHERE idCompra = @idCompra");



                //.query("SELECT * FROM DetalleCompras  WHERE idCompra = @idCompra");
                res.status(200).send({data:detallecompras.recordset});
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

const crear_detalle_compras_idcompra = async (req, res) => {
    
    const { idSucursal, idCompra, cantidad, idProducto, idPresentacion, pUnitario, total } = req.body;
    console.log('crear_detalle_compras_idcompra: ' , req.body);

    const idUsuario = req.user.sub;
    const idEmpresa = req.user.empresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let detalleCompra = await pool
                .request()
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idCompra', sql.UniqueIdentifier, idCompra)
                .input('cantidad', sql.Decimal, cantidad)
                .input('idProducto', sql.UniqueIdentifier, idProducto)
                .input('idPresentacion', sql.Int, idPresentacion)
                .input('pUnitario', sql.Decimal, pUnitario)
                .input('total', sql.Decimal, total)
                .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                .query("INSERT INTO DetalleCompras (idEmpresa, idSucursal, idCompra, cantidad, idProducto, idPresentacion, pUnitario, total, idUsuario) VALUES (@idEmpresa, @idSucursal, @idCompra, @cantidad, @idProducto, @idPresentacion, @pUnitario, @total, @idUsuario)");

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

const editar_detalle_compras_idcompra = async (req, res) => {
    
    const { idEmpresa, idSucursal, idCompra, cantidad, idProducto, idPresentacion, pUnitario, total, idUsuario } = req.body;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                
                let pool = await sql.connect(dbConfig);
                let detalleCompra = await pool
                .request()
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idCompra', sql.Int, idCompra)
                .input('cantidad', sql.Decimal, cantidad)
                .input('idProducto', sql.UniqueIdentifier, idProducto)
                .input('idPresentacion', sql.Int, idPresentacion)
                .input('pUnitario', sql.Decimal, pUnitario)
                .input('total', sql.Decimal, total)
                .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                .query("UPDATE DetalleCompras SET idEmpresa = @idEmpresa, idSucursal = @idSucursal, idCompra = @idCompra, cantidad = @cantidad, idProducto = @idProducto, idPresentacion = @idPresentacion, pUnitario = @pUnitario, total = @total, idUsuario = @idUsuario WHERE idCompra = '" + idCompra + "'");

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