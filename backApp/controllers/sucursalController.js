const sql = require('mssql');
const dbConfig = require('../dbconfig');

const { v4: uuidv4 } = require('uuid');

// create table Sucursal
// (
// idSucursal UNIQUEIDENTIFIER primary key not null,
// idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
// nombre varchar(20) not null,
// direccion varchar(200) null,
// idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
// fregistro datetime not null
// )

// crea un crud para la tabla sucursal de la base de datos
const obtener_sucursal_idempresa = async (req, res) => {
     const idEmpresa = req.user.empresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let sucursal = await pool.request().query("SELECT * FROM Sucursal WHERE idEmpresa = '" + idEmpresa + "'");
                res.status(200).send({data:sucursal.recordset});
            } catch (error) {
                console.log('obterner sucursal error: ' + error);
                res.status(500).send({ message: 'Error al obtener los sucursal', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const obtener_sucursal_todos = async (req, res) => {
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let sucursal = await pool.request().query("SELECT * FROM Sucursal");
                res.status(200).send({data:sucursal.recordset});
            } catch (error) {
                console.log('obterner sucursal error: ' + error);
                res.status(500).send({ message: 'Error al obtener los sucursal', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const crear_sucursal_idEmpresa = async (req, res) => {
    
    const { nombre, direccion } = req.body;

    const idUsuario = req.user.idUsuario;
    const idEmpresa = req.user.empresa;
    const idSucursal = uuidv4();

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let sucursal = await pool
                .request()
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('nombre', sql.VarChar, nombre)
                .input('direccion', sql.VarChar, direccion)
                .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                .query("INSERT INTO Sucursal (idSucursal, idEmpresa, nombre, direccion, idUsuario, fregistro) VALUES (@idSucursal, @idEmpresa, @nombre, @direccion, @idUsuario, GETDATE())");

                res.status(200).send({ message: 'Sucursal creada correctamente', data: sucursal.rowsAffected });
            } catch (error) {
                console.log('crear sucursal error: ' + error);
                res.status(500).send({ message: 'Error al crear la sucursal', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const editar_sucursal_idEmpresa = async (req, res) => {
    
    const { idEmpresa, idUsuario, nombre, direccion } = req.body;


    const idSucursal = req.params.id;
    

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            
            try {
                let pool = await sql.connect(dbConfig);
                let sucursal = await pool
                .request()
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('nombre', sql.VarChar, nombre)
                .input('direccion', sql.VarChar, direccion)
                .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                .query("UPDATE Sucursal SET nombre = @nombre, direccion = @direccion, idUsuario = @idUsuario, fregistro = GETDATE() WHERE idSucursal = @idSucursal and idEmpresa = @idEmpresa");

                res.status(200).send({ message: 'Sucursal editada correctamente', data: sucursal.rowsAffected });
            } catch (error) {
                console.log('editar sucursal error: ' + error);
                res.status(500).send({ message: 'Error al editar la sucursal', data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const eliminar_sucursal_idempresa = async (req, res) => {
    const idEmpresa = req.user.empresa;

   if (req.user) {
       if (req.user.rol == 'Administrador') {
            
              try {
                let pool = await sql.connect(dbConfig);
                let sucursal = await pool
                .request()
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .query("DELETE FROM Sucursal WHERE idEmpresa = @idEmpresa");
    
                res.status(200).send({ message: 'Sucursal eliminada correctamente', data: sucursal.rowsAffected });
              } catch (error) {
                console.log('eliminar sucursal error: ' + error);
                res.status(500).send({ message: 'Error al eliminar la sucursal', data: undefined });
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

// create table StockSucursal
// (
// idStockSucursal int identity(1,1) primary key not null,
// idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal) ON DELETE CASCADE,
// idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
// cantidad decimal(18,2) not null,
// ubicacion Varchar(20) null,
// fIngreso datetime null,
// idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,


// )

const obtener_stock_sucursal_idProducto = async (req, res) => {
    const { idProducto } = req.params.id;
    const idSucursal = req.body.idSucursal;

   if (req.user) {
       if (req.user.rol == 'Administrador') {
           try {
               let pool = await sql.connect(dbConfig);
               let stockSucursal = await pool
               .request()
                .input('idSucursal', sql.UniqueIdentifier, idSucursal)
                .input('idProducto', sql.UniqueIdentifier, idProducto)
                //quiero consultar el stock de un producto en una sucursal uniendo las tablas stockSucursal y productos con inner join
                .query("SELECT * FROM StockSucursal inner join Productos on StockSucursal.idProducto = Productos.idProducto WHERE idSucursal = @idSucursal and idProducto = @idProducto");
                res.status(200).send({data:stockSucursal.recordset});

               

           } catch (error) {
               console.log('obterner stockSucursal error: ' + error);
               res.status(500).send({ message: 'Error al obtener los stockSucursal', data: undefined });
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
    obtener_sucursal_idempresa,
    obtener_sucursal_todos,
    crear_sucursal_idEmpresa,
    editar_sucursal_idEmpresa,
    eliminar_sucursal_idempresa,

    /////////////////////////////////
    obtener_stock_sucursal_idProducto

}