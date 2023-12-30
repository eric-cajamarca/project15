const sql = require('mssql');
const dbConfig = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

//create table Productos   
// (
//     idProducto UNIQUEIDENTIFIER primary key not null,
//     idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
//     Codigo varchar(20) not null,
//     idCategoria int not null,
//     descripcion varchar(200) not null,
//     idPresentacion int not null,
//     cUnitario decimal(18,5) not null,
//     fProduccion varchar(10) null,
//     fVencimiento varchar(10) null,
//     alertaMinimo decimal(18,5)null,
//     alertaMaximo decimal(18,5) null,
//     VecesVendidas int null,
//     facturar varchar(2) null,
//     idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
//     FIngreso datetime not null,
    
//     FOREIGN KEY (idCategoria) REFERENCES Categorias (idCategoria),
//     FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
//     )

// crea un crud para la tabla productos de la base de datos
const obtener_productos_todos = async (req, res) => {
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                //let productos = await pool.request().query("SELECT * FROM Productos");

                //quiero traer todos los productos con sus tablas relacionadas (idCategoria, idPresentacion) de la base de datos usando inner join
                let productos = await pool.request().query("SELECT * FROM Productos INNER JOIN Categorias ON Productos.idCategoria = Categorias.idCategoria INNER JOIN Presentacion ON Productos.idPresentacion = Presentacion.idPresentacion");

                


                // let productos = await pool.request().query("SELECT * FROM Productos");
                res.status(200).send({data:productos.recordset});
            } catch (error) {
                console.log('obterner productos error: ' + error);
                res.status(500).send({ message: 'Error al obtener los productos', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    } 
    
}

const obtener_productos_id = async (req, res) => {
    const { idProducto } = req.params.id;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let productos = await pool.request().query("SELECT * FROM Productos WHERE idProducto = '" + idProducto + "'");
                res.status(200).send({data:productos.recordset});
            } catch (error) {
                console.log('obterner productos error: ' + error);
                res.status(500).send({ message: 'Error al obtener los productos', data: undefined });
            }
            
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    } 
    
}

const crear_producto = async (req, res) => {
    const { Codigo, idCategoria, descripcion, idPresentacion, cUnitario, fProduccion, fVencimiento, alertaMinimo, alertaMaximo, VecesVendidas, facturar, idUsuario, FIngreso } = req.body;

    //crear id unico
    const idProducto = uuidv4();
    const idEmpresa = req.user.empresa;


    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let productos = await pool
                .request()
                .input("idProducto", sql.UniqueIdentifier, idProducto)
                .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                .input("Codigo", sql.VarChar, Codigo)
                .input("idCategoria", sql.Int, idCategoria)
                .input("descripcion", sql.VarChar, descripcion)
                .input("idPresentacion", sql.Int, idPresentacion)
                .input("cUnitario", sql.Decimal, cUnitario)
                .input("fProduccion", sql.VarChar, fProduccion)
                .input("fVencimiento", sql.VarChar, fVencimiento)
                .input("alertaMinimo", sql.Decimal, alertaMinimo)
                .input("alertaMaximo", sql.Decimal, alertaMaximo)
                .input("VecesVendidas", sql.Int, VecesVendidas)
                .input("facturar", sql.VarChar, facturar)
                .input("idUsuario", sql.UniqueIdentifier, idUsuario)
                .input("FIngreso", sql.DateTime, FIngreso)
                .query("INSERT INTO Productos VALUES (@idProducto, @idEmpresa, @Codigo, @idCategoria, @descripcion, @idPresentacion, @cUnitario, @fProduccion, @fVencimiento, @alertaMinimo, @alertaMaximo, @VecesVendidas, @facturar, @idUsuario, @FIngreso)");

                
                res.status(200).send({data:productos.recordset});
            } catch (error) {
                console.log('crear productos error: ' + error);
                res.status(500).send({ message: 'Error al crear los productos', data: undefined });
            }
            
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    } 
    

}

const actualizar_producto = async (req, res) => {
    const { idProducto } = req.params.id;
    const { Codigo, idCategoria, descripcion, idPresentacion, cUnitario, fProduccion, fVencimiento, alertaMinimo, alertaMaximo, VecesVendidas, facturar, idUsuario, FIngreso } = req.body;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let productos = await pool
                .request()
                .input("idProducto", sql.UniqueIdentifier, idProducto)
                .input("Codigo", sql.VarChar, Codigo)
                .input("idCategoria", sql.Int, idCategoria)
                .input("descripcion", sql.VarChar, descripcion)
                .input("idPresentacion", sql.Int, idPresentacion)
                .input("cUnitario", sql.Decimal, cUnitario)
                .input("fProduccion", sql.VarChar, fProduccion)
                .input("fVencimiento", sql.VarChar, fVencimiento)
                .input("alertaMinimo", sql.Decimal, alertaMinimo)
                .input("alertaMaximo", sql.Decimal, alertaMaximo)
                .input("VecesVendidas", sql.Int, VecesVendidas)
                .input("facturar", sql.VarChar, facturar)
                .input("idUsuario", sql.UniqueIdentifier, idUsuario)
                .input("FIngreso", sql.DateTime, FIngreso)
                .query("UPDATE Productos SET Codigo = @Codigo, idCategoria = @idCategoria, descripcion = @descripcion, idPresentacion = @idPresentacion, cUnitario = @cUnitario, fProduccion = @fProduccion, fVencimiento = @fVencimiento, alertaMinimo = @alertaMinimo, alertaMaximo = @alertaMaximo, VecesVendidas = @VecesVendidas, facturar = @facturar, idUsuario = @idUsuario, FIngreso = @FIngreso WHERE idProducto = @idProducto");

                
                res.status(200).send({data:productos.recordset});
            } catch (error) {
                console.log('actualizar productos error: ' + error);
                res.status(500).send({ message: 'Error al actualizar los productos', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

// const eliminar_producto = async (req, res) => {
//     const { idProducto } = req.params.id;

//     if (req.user) {
//         if (req.user.rol == 'Administrador') {
//             try {
//                 let pool = await sql.connect(dbConfig);
//                 let productos = await pool.request().query("DELETE FROM Productos WHERE idProducto = '" + idProducto + "'");
//                 res.status(200).send({data:productos.recordset});
//             } catch (error) {
//                 console.log('eliminar productos error: ' + error);
//                 res.status(500).send({ message: 'Error al eliminar los productos', data: undefined });
//             }
//         } else {
//             res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
//         }
//     }else {
//         res.status(500).send({ message: 'No Access', data: undefined });
//     }
// }

module.exports = {
    obtener_productos_todos,
    obtener_productos_id,
    crear_producto,
    actualizar_producto

}