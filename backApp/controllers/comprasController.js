const sql = require('mssql');
const dbConfig = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

// create table Compras
// (
// idcompra int identity (1,1) primary key not null,
// idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
// compCompra char(13) not null,
// idComprobante int not null,
// serie varchar(4) not null,
// numero varchar (8) not null,
// fEmision datetime not null,
// fVencimiento datetime null,
// idProveedor int not null,
// idMoneda int not null,
// idEstadoPago int not null,
// subTotal decimal(18,2),
// igv decimal(18,2),
// exonerado decimal(18,2),
// gratuito decimal(18,2),
// otrosCargos decimal(18,2),
// descuentos decimal(18,2),
// total decimal(18,2),
// idMediosPago varchar(3) not null, --el estado determinara pendiente o pagado
// compRelacionado varchar(50),
// idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
// )

// crea un crud para la tabla compras de la base de datos
const obtener_compras_todos = async (req, res) => {
    console.log('obtener_compras_todos req.user ');
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let compras = await pool.request()
                //quiero obtener todas las compras con las columnas con la informacion de las tablas relacionadas como idCliente y idEstadoPago
                .query("SELECT * FROM Compras INNER JOIN Clientes ON Compras.idCliente = Clientes.idCliente INNER JOIN EstadoPago ON Compras.idEstadoPago = EstadoPago.idEstadoPago");
                // .query("SELECT * FROM Compras INNER JOIN Clientes ON Compras.idCliente = Clientes.idCliente");
                // .query("SELECT * FROM Compras");

                //quiero convertir el formato de fecha de las compras
                 for (let i = 0; i < compras.recordset.length; i++) {
                        compras.recordset[i].fEmision = compras.recordset[i].fEmision.toISOString().split('T')[0];
                        compras.recordset[i].fVencimiento = compras.recordset[i].fVencimiento.toISOString().split('T')[0];
                    }
                //
                console.log('obtener_compras_todos ', compras.recordset);
                res.status(200).send({ data: compras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const obtener_compras_id = async (req, res) => {
    const { idCompra } = req.params.id;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let compras = await pool.request().query("SELECT * FROM Compras WHERE idCompra = '" + idCompra + "'");
                res.status(200).send({ data: compras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const obtener_compras_idCompra_idEmpresa = async (req, res) => {
    const { idCompra } = req.params.id;
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let compras = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('idCompra', sql.UniqueIdentifier, idCompra)
                    .query("SELECT * FROM Compras WHERE idEmpresa = @idEmpresa AND idCompra = @idCompra");

                res.status(200).send({ data: compras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }


}

const obtener_compras_todos_idEmpresa = async (req, res) => {

    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let compras = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .query("SELECT * FROM Compras WHERE idEmpresa = @idEmpresa");

                res.status(200).send({ data: compras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const crear_compra = async (req, res) => {
    const { idCliente, compCompra, idComprobante, serie, numero, fEmision, fVencimiento, idMoneda, idEstadoPago, subTotal, igv, exonerado, gratuito, otrosCargos, descuentos, total, idMediosPago, compRelacionado } = req.body;

    console.log('crear_compra ', req.body);

    const idEmpresa = req.user.empresa;
    const idUsuario = req.user.sub;
    //generar el id de la compra


    const idCompra = uuidv4();

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let regCompra = await pool
                    .request()
                    .input("idCompra", sql.UniqueIdentifier, idCompra)
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("compCompra", sql.VarChar, compCompra)
                    .input("idComprobante", sql.Int, idComprobante)
                    .input("serie", sql.VarChar, serie)
                    .input("numero", sql.VarChar, numero)
                    .input("fEmision", sql.DateTime, fEmision)
                    .input("fVencimiento", sql.DateTime, fVencimiento)
                    .input("idCliente", sql.Int, idCliente)
                    .input("idMoneda", sql.Int, idMoneda)
                    .input("idEstadoPago", sql.Int, idEstadoPago)
                    .input("subTotal", sql.Decimal, subTotal)
                    .input("igv", sql.Decimal, igv)
                    .input("exonerado", sql.Decimal, exonerado)
                    .input("gratuito", sql.Decimal, gratuito)
                    .input("otrosCargos", sql.Decimal, otrosCargos)
                    .input("descuentos", sql.Decimal, descuentos)
                    .input("total", sql.Decimal, total)
                    .input("idMediosPago", sql.VarChar, idMediosPago)
                    .input("compRelacionado", sql.VarChar, compRelacionado)
                    .input("idUsuario", sql.UniqueIdentifier, idUsuario)
                    .query('INSERT INTO Compras VALUES (@idCompra,@idEmpresa, @compCompra, @idComprobante, @serie, @numero, @fEmision, @fVencimiento, @idCliente, @idMoneda, @idEstadoPago, @subTotal, @igv, @exonerado, @gratuito, @otrosCargos, @descuentos, @total, @idMediosPago, @compRelacionado, @idUsuario) SELECT SCOPE_IDENTITY() AS idCompra;');

                if (regCompra.rowsAffected[0] == 1) {
                    console.log('compra creada ', idCompra);
                    res.status(200).send({ data: idCompra });
                }

            } catch (error) {
                console.log('crear compras error: ' + error);
                res.status(500).send({ message: 'Error al crear la compra', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    } else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const editar_compra = async (req, res) => {
    const { compCompra, idComprobante, serie, numero, fEmision, fVencimiento, idProveedor, idMoneda, idEstadoPago, subTotal, igv, exonerado, gratuito, otrosCargos, descuentos, total, idMediosPago, compRelacionado, idUsuario } = req.body;
    console.log(req.body);
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            //solo quiero editar los datos modificcados
            try {
                let pool = await sql.connect(dbConfig);
                await pool
                    .request()
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("compCompra", sql.VarChar, compCompra)
                    .input("idComprobante", sql.Int, idComprobante)
                    .input("serie", sql.VarChar, serie)
                    .input("numero", sql.VarChar, numero)
                    .input("fEmision", sql.DateTime, fEmision)
                    .input("fVencimiento", sql.DateTime, fVencimiento)
                    .input("idProveedor", sql.Int, idProveedor)
                    .input("idMoneda", sql.Int, idMoneda)
                    .input("idEstadoPago", sql.Int, idEstadoPago)
                    .input("subTotal", sql.Decimal, subTotal)
                    .input("igv", sql.Decimal, igv)
                    .input("exonerado", sql.Decimal, exonerado)
                    .input("gratuito", sql.Decimal, gratuito)
                    .input("otrosCargos", sql.Decimal, otrosCargos)
                    .input("descuentos", sql.Decimal, descuentos)
                    .input("total", sql.Decimal, total)
                    .input("idMediosPago", sql.VarChar, idMediosPago)
                    .input("compRelacionado", sql.VarChar, compRelacionado)
                    .input("idUsuario", sql.UniqueIdentifier, idUsuario)
                    .query("UPDATE Compras SET idComprobante = @idComprobante, serie = @serie, numero = @numero, fEmision = @fEmision, fVencimiento = @fVencimiento, idProveedor = @idProveedor, idMoneda = @idMoneda, idEstadoPago = @idEstadoPago, subTotal = @subTotal, igv = @igv, exonerado = @exonerado, gratuito = @gratuito, otrosCargos = @otrosCargos, descuentos = @descuentos, total = @total, idMediosPago = @idMediosPago, compRelacionado = @compRelacionado, idUsuario = @idUsuario WHERE idEmpresa = @idEmpresa AND compCompra = @compCompra");
                res.status(200).send({ message: 'Compra editada correctamente', data: undefined });
            } catch (error) {
                console.log('editar compras error: ' + error);
                res.status(500).send({ message: 'Error al editar la compra', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    } else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const eliminar_compra = async (req, res) => {
    const { compCompra } = req.body;

    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                await pool
                    .request()
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("compCompra", sql.Char, compCompra)
                    .query("DELETE FROM Compras WHERE idEmpresa = @idEmpresa AND compCompra = @compCompra");
                res.status(200).send({ message: 'Compra eliminada correctamente', data: undefined });
            } catch (error) {
                console.log('eliminar compras error: ' + error);
                res.status(500).send({ message: 'Error al eliminar la compra', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    } else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const buscar_comprobante_idCliente = async function(req, res) {
    const idCliente = req.params.id;

   const idEmpresa = req.user.empresa;

   console.log('buscar_comprobante_idCliente req.params', req.params);

    if(req.user){
        if(req.user.rol == 'Administrador'){
            try {
                let pool = await sql.connect(dbConfig);
                let compras = await pool
                    .request()
                    .input('idCliente', sql.Int, idCliente)
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .query("SELECT compCompra FROM Compras WHERE idCliente = @idCliente AND idEmpresa = @idEmpresa");
                    
                    
                res.status(200).send({ data: compras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }
        }else{
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else{
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// create table BorradorCompras
// (
// idBorradorCompras int identity(1,1) not null,
// idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
// Cantidad decimal(18,3) null,
// Codigo varchar(50) null,
// Categoria varchar(50) null,
// Descripcion varchar(200) null,
// Presentacion varchar(20) null,
// CUnitario decimal(18,5) null,
// FProduccion varchar(10) null,
// FVencimiento varchar(10) null,
// Ubicacion varchar(20) null,
// Total decimal(18,2) null,
// Serie_Numero char(13) null,
// Razon_Social varchar(200) null
// )

const obtener_borrador_compras_empresa = async (req, res) => {
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);

                let borradorCompras = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .query("SELECT * FROM BorradorCompras WHERE idEmpresa = @idEmpresa");
                res.status(200).send({ data: borradorCompras.recordset });
            } catch (error) {
                console.log('obterner compras error: ' + error);
                res.status(500).send({ message: 'Error al obtener las compras', data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const crear_borrador_compras_empresa = async (req, res) => {
    const { Cantidad, Codigo, Categoria, Descripcion, Presentacion, CUnitario, FProduccion, FVencimiento, Ubicacion, Total, Serie_Numero, Razon_Social } = req.body;
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                await pool
                    .request()
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("Cantidad", sql.Decimal, Cantidad)
                    .input("Codigo", sql.VarChar, Codigo)
                    .input("Categoria", sql.VarChar, Categoria)
                    .input("Descripcion", sql.VarChar, Descripcion)
                    .input("Presentacion", sql.VarChar, Presentacion)
                    .input("CUnitario", sql.Decimal, CUnitario)
                    .input("FProduccion", sql.VarChar, FProduccion)
                    .input("FVencimiento", sql.VarChar, FVencimiento)
                    .input("Ubicacion", sql.VarChar, Ubicacion)
                    .input("Total", sql.Decimal, Total)
                    .input("Serie_Numero", sql.Char, Serie_Numero)
                    .input("Razon_Social", sql.VarChar, Razon_Social)
                    .query("INSERT INTO BorradorCompras VALUES (@idEmpresa, @Cantidad, @Codigo, @Categoria, @Descripcion, @Presentacion, @CUnitario, @FProduccion, @FVencimiento, @Ubicacion, @Total, @Serie_Numero, @Razon_Social)");
                res.status(200).send({ message: 'Borrador de compra creado correctamente', data: undefined });
            } catch (error) {
                console.log('crear compras error: ' + error);
                res.status(500).send({ message: 'Error al crear la compra', data: undefined });
            }


        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const editar_borrador_compras_empresa = async (req, res) => {
    const { Cantidad, Codigo, Categoria, Descripcion, Presentacion, CUnitario, FProduccion, FVencimiento, Ubicacion, Total, Serie_Numero, Razon_Social } = req.body;
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {

                let pool = await sql.connect(dbConfig);
                await pool
                    .request()
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("Cantidad", sql.Decimal, Cantidad)
                    .input("Codigo", sql.VarChar, Codigo)
                    .input("Categoria", sql.VarChar, Categoria)
                    .input("Descripcion", sql.VarChar, Descripcion)
                    .input("Presentacion", sql.VarChar, Presentacion)
                    .input("CUnitario", sql.Decimal, CUnitario)
                    .input("FProduccion", sql.VarChar, FProduccion)
                    .input("FVencimiento", sql.VarChar, FVencimiento)
                    .input("Ubicacion", sql.VarChar, Ubicacion)
                    .input("Total", sql.Decimal, Total)
                    .input("Serie_Numero", sql.Char, Serie_Numero)
                    .input("Razon_Social", sql.VarChar, Razon_Social)
                    .query("UPDATE BorradorCompras SET Cantidad = @Cantidad, Codigo = @Codigo, Categoria = @Categoria, Descripcion = @Descripcion, Presentacion = @Presentacion, CUnitario = @CUnitario, FProduccion = @FProduccion, FVencimiento = @FVencimiento, Ubicacion = @Ubicacion, Total = @Total, Razon_Social = @Razon_Social WHERE idEmpresa = @idEmpresa AND Serie_Numero = @Serie_Numero");
                res.status(200).send({ message: 'Borrador de compra editado correctamente', data: undefined });

            } catch (error) {
                console.log('crear compras error: ' + error);
                res.status(500).send({ message: 'Error al crear la compra', data: undefined });
            }


        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

const eliminar_borrador_compras_empresa = async (req, res) => {
    const idEmpresa = req.user.idEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let datoEliminado = await pool
                    .request()
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .query("DELETE FROM BorradorCompras WHERE idEmpresa = @idEmpresa");
                res.status(200).send({ message: 'Borrador de compra eliminado correctamente', data: datoEliminado.rowsAffected });
            } catch (error) {
                console.log('crear compras error: ' + error);
                res.status(500).send({ message: 'Error al crear la compra', data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

///////////////////////////////////////////////////////////////////////////////////////
// create table Correlativos
// (
// idCorrelativo int identity (1,1) primary key not null,
// idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
// numero int not null,
// )

const obtener_correlativos_empresa = async (req, res) => {
    const idEmpresa = req.user.empresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let correlativos = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .query("SELECT * FROM Correlativos WHERE idEmpresa = @idEmpresa");
                res.status(200).send({ data: correlativos.recordset });
            } catch (error) {
                console.log('obterner correlativos error: ' + error);
                res.status(500).send({ message: 'Error al obtener los correlativos', data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }


}

const editar_correlativos_empresa = async function (req, res) {
    const idCorrelativo = req.params.id;
    const { numero } = req.body;

    const idEmpresa = req.user.empresa;

    console.log('editar_correlativos_empresa req.body', req.body);
    console.log('editar_correlativos_empresa req.params', req.params);
    if (req.user) {


        try {
            let pool = await sql.connect(dbConfig);
            let datoEditado = await pool
                .request()
                .input('idCorrelativo', sql.Int, idCorrelativo)
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input("numero", sql.Int, numero)
                .query("UPDATE Correlativos SET numero = @numero WHERE idEmpresa = @idEmpresa AND idCorrelativo = @idCorrelativo");
                //.query("UPDATE Correlativos SET numero = @numero WHERE idEmpresa = @idEmpresa");

            res.status(200).send({ message: 'Correlativo editado correctamente', data: datoEditado.rowsAffected });
        } catch (error) {
            console.log('obterner correlativos error: ' + error);
            res.status(500).send({ message: 'Error al obtener los correlativos', data: undefined });
        }


    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }

}

module.exports = {
    obtener_compras_todos,
    obtener_compras_id,
    obtener_compras_idCompra_idEmpresa,
    obtener_compras_todos_idEmpresa,
    crear_compra,
    editar_compra,
    eliminar_compra,
    ///////////////////////////
    //borrador compras
    obtener_borrador_compras_empresa,
    crear_borrador_compras_empresa,
    editar_borrador_compras_empresa,
    eliminar_borrador_compras_empresa,

    /////////////////////////////
    //correlativos
    obtener_correlativos_empresa,
    editar_correlativos_empresa,

    /////////////////////////////
    //buscar comprobante
    buscar_comprobante_idCliente

}