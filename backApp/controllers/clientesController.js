const sql = require('mssql');
const dbConfig = require('../dbconfig');



//1. crea el metodo crearCliente segun los datos de la tabla
const crearCliente = async function (req, res) {
    const { idDocumento, ruc, rSocial, correo, celular, condicion, } = req.body;

    //quiero extaer data del req para poder crear el registro

    console.log('crearCliente - req.data', req.data);
    console.log('crearCliente - req.body', req.body);
    console.log('crearCliente- req.user', req.user);

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            //antes de registrar el cliente, verificar si existe el ruc
            let pool = await sql.connect(dbConfig);
            let existeCliente = await pool.request()
                .input('ruc', sql.VarChar, ruc)
                .query('select * from Clientes where ruc = @ruc');

            console.log('crearCliente - existeCliente', existeCliente.recordset.length);

            if (existeCliente.recordset.length > 0) {
                res.status(200).send({ message: 'El ruc ya existe', data: undefined });
                return;
            }else{
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
    
    
                    res.status(200).send({ message: 'Cliente creado', data: insertCliente.rowsAffected });
    
                } catch (error) {
                    res.status(500).send({ message: error.message, data: undefined });
                }
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
const listarClientes = async function (req, res) {
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

//2. crea el metodo listarClientes_id segun los datos de la tabla
const listarClientes_ruc = async function (req, res) {
    const ruc = req.params.id;

    console.log('listarClientes_ruc - req.data', req.body);
    console.log('listarClientes_ruc - req.params', req.params);

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let clientes = await pool.request()
                    .input('ruc', sql.VarChar, ruc)
                    .query('select * from Clientes where ruc = @ruc');
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

const listarClientes_id = async function (req, res) {
    const idCliente = req.params.id;

    console.log('listarClientes_idCliente - req.data', req.body);
    console.log('listarClientes_idCliente - req.params', req.params);

    if (req.user) {
        if (req.user.rol == 'Administrador') {

            try {
                let pool = await sql.connect(dbConfig);
                let clientes = await pool.request()
                    .input('idCliente', sql.VarChar, idCliente)
                    .query('select * from Clientes where idCliente = @idCliente');
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
const actualizarCliente = async function (req, res) {
    const { idDocumento, ruc, rSocial, correo, celular, condicion, } = req.body;
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

const eliminarCliente = async function (req, res) {
    const idCliente = req.params.id;

    console.log('eliminarCliente - req.params', idCliente);


    if (req.user) {
        if (req.user.rol == 'Administrador') {

            // let pool = await sql.connect(dbConfig);
            // let eliminarDireccionCliente = await pool.request()
            //     .input('idCliente', sql.Int, idCliente)
            //     .query('delete from DireccionClientes where idCliente = @idCliente');
            
            // if (eliminarDireccionCliente.rowsAffected > 0) {
               
                try {
                    let pool = await sql.connect(dbConfig);
                    let deleteCliente = await pool.request()
                        .input('idCliente', sql.Int, idCliente)
                        .query('delete from Clientes where idCliente = @idCliente');
                    res.status(200).send({ message: 'Cliente eliminado', data: deleteCliente.rowsAffected });
                } catch (error) {
                    console.log('eliminarCliente - error', error);
                    res.status(500).send({ message: error.message, data: undefined });
                }
            // }


           

        }
        else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }

}


//crear el metodo para cambiar condicion del cliente a inactivo
//5. crea el metodo cambiarCondicionCliente segun los datos de la tabla
const cambiarCondicionCliente = async function (req, res) {
    const idCliente = req.params.id;

    const { condicion } = req.body;

    console.log('cambiarCondicionCliente - req.params', idCliente);
    console.log('cambiarCondicionCliente - req.body', condicion);
    let nuevacondicion = '';

    if (condicion === 'ACTIVO') {
        nuevacondicion = 'INACTIVO';
    } else {
        nuevacondicion = 'ACTIVO';
    }

    if (req.user) {
        if (req.user.rol == 'Administrador') {


            console.log('cambiarCondicionCliente - nuevacondicion antes de editar', nuevacondicion);

            try {
                let pool = await sql.connect(dbConfig);
                let editCliente = await pool.request()
                    .input('idCliente', sql.Int, idCliente)
                    .input('nuevacondicion', sql.VarChar, nuevacondicion)
                    .query('update Clientes set condicion = @nuevacondicion where idCliente = @idCliente');

                console.log('cambiarCondicionCliente - deleteCliente', editCliente.rowsAffected);
                res.status(200).send({ message: 'Cliente eliminado', data: editCliente.rowsAffected });
            } catch (error) {
                console.log('cambiarCondicionCliente - error', error);
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



module.exports = {
    crearCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente,
    listarClientes_ruc,
    cambiarCondicionCliente,
    listarClientes_id

}