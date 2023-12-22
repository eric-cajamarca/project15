const sql = require('mssql');
const dbConfig = require('../dbconfig');

//quiero crear un crud para Clientes, alli te paso la estructura de la tabla
// create table Clientes (idCliente int identity (1,1) primary key not null,idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,idDocumento varchar(1) not null,ruc varchar(11) not null,rSocial varchar(200) not null,correo varchar(100) null,celular varchar (50) null,condicion varchar(50) null)

//aqui va el codigo para crear el crud de clientes
//el crud debe tener las siguientes funciones
//1. crearCliente
//2. listarClientes
//3. actualizarCliente
//4. eliminarCliente

//1. crea el metodo crearCliente segun los datos de la tabla
async function crearCliente(req,res){
    const { idDocumento, ruc, rSocial,correo, celular, condicion,} = req.body;


    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let idEmpresa = req.user.empresa;

                let pool = await sql.connect(dbConfig);
                let insertCliente = await pool.request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('idDocumento', sql.VarChar, idDocumento)
                    .input('ruc', sql.VarChar, ruc)
                    .input('rSocial', sql.VarChar, rSocial)
                    .input('correo', sql.VarChar, correo)
                    .input('celular', sql.VarChar, celular)
                    .input('condicion', sql.VarChar, condicion)
                    .query('insert into Clientes (idEmpresa,idDocumento,ruc,rSocial,correo,celular,condicion) values (@idEmpresa,@idDocumento,@ruc,@rSocial,@correo,@celular,@condicion)');

                    //quiero extraer el idCliente del insertCliente
                    let idCliente = insertCliente.recordset[0].idCliente

                    //crear un registro con esta tabla CREATE TABLE DireccionClientes ( idDireccionClientes INT IDENTITY(1,1) PRIMARY KEY not null, idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE, idCliente int not null,ubigeo varchar(10) null,codPais varchar(10) null,region varchar(50) NULL,provincia varchar(50) NULL,distrito varchar(50) NULL,urbanizacion varchar(100) null,direccion VARCHAR(255) null,referencia varchar(200) null,codLocal varchar(10) null           )
                    let insertDireccionCliente = await pool.request()
                        .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                        .input('idCliente', sql.Int, idCliente)
                        .input('ubigeo', sql.VarChar, null)
                        .input('codPais', sql.VarChar, null)
                        .input('region', sql.VarChar, null)
                        .input('provincia', sql.VarChar, null)
                        .input('distrito', sql.VarChar, null)
                        .input('urbanizacion', sql.VarChar, null)
                        .input('direccion', sql.VarChar, null)
                        .input('referencia', sql.VarChar, null)
                        .input('codLocal', sql.VarChar, null)
                        .query('insert into DireccionClientes (idEmpresa,idCliente,ubigeo,codPais,region,provincia,distrito,urbanizacion,direccion,referencia,codLocal) values (@idEmpresa,@idCliente,@ubigeo,@codPais,@region,@provincia,@distrito,@urbanizacion,@direccion,@referencia,@codLocal)');
                    
                res.status(200).send({ message: 'Cliente creado', data: insertCliente.recordset });
            } catch (error) {
                res.status(500).send({ message: error.message, data: undefined });
            }


        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
       
}

//2. crea el metodo listarClientes segun los datos de la tabla
async function listarClientes(req,res){
    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let clientes = await pool.request().query('select * from Clientes');
                res.status(200).send({ message: 'Lista de clientes', data: clientes.recordset });
            } catch (error) {
                res.status(500).send({ message: error.message, data: undefined });
            }
        }
        else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
}

//3. crea el metodo actualizarCliente segun los datos de la tabla
async function actualizarCliente(req,res){
    const { idDocumento, ruc, rSocial,correo, celular, condicion,} = req.body;
    const idCliente = req.params.idCliente;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let updateCliente = await pool.request()
                    .input('idCliente', sql.Int, idCliente)
                    .input('idDocumento', sql.VarChar, idDocumento)
                    .input('ruc', sql.VarChar, ruc)
                    .input('rSocial', sql.VarChar, rSocial)
                    .input('correo', sql.VarChar, correo)
                    .input('celular', sql.VarChar, celular)
                    .input('condicion', sql.VarChar, condicion)
                    .query('update Clientes set idDocumento = @idDocumento, ruc = @ruc, rSocial = @rSocial, correo = @correo, celular = @celular, condicion = @condicion where idCliente = @idCliente');
                res.status(200).send({ message: 'Cliente actualizado', data: updateCliente.recordset });
            } catch (error) {
                res.status(500).send({ message: error.message, data: undefined });
            }
        }
        else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
            
}

//4. crea el metodo eliminarCliente segun los datos de la tabla

async function eliminarCliente(req,res){
    const idCliente = req.params.idCliente;

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let deleteCliente = await pool.request()
                    .input('idCliente', sql.Int, idCliente)
                    .query('delete from Clientes where idCliente = @idCliente');
                res.status(200).send({ message: 'Cliente eliminado', data: deleteCliente.recordset });
            } catch (error) {
                res.status(500).send({ message: error.message, data: undefined });
            }

        }
        else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }

}



module.exports={
    crearCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente
}