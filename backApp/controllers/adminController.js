const sql = require('mssql');
const dbConfig = require('../dbconfig');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('../helpers/jwt');
const { v4: uuidv4 } = require('uuid');


const getAdmin = async function (req, res) {

    if (req.user) {

        if (req.user.rol == 'Administrador') {

            //  if(req.user.rol=='Administrador'){
            console.log('req.user.rol', req.user.rol);
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                .request()
                .input('empresa', sql.UniqueIdentifier, req.user.empresa)
                .query('SELECT * FROM UsuarioWeb UW INNER JOIN Rol R ON UW.idRol = R.idRol WHERE UW.idEmpresa = @empresa')
                //.query('SELECT * FROM UsuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol where UsuarioWeb.estado = 1 and idEmpresa = @empresa');
                // res.json(result.recordset);
                // console.log('result.recordset');
                // console.log(result.recordset);
                res.status(200).send({ data: result.recordset });
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                res.status(200).send({ data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
};



const createAdmin = async (req, res) => {
    const { nombres, apellidos, email, password, idRol, estado } = req.body;
    console.log('createAdmin req.body: ', req.body);

    const currentDate = moment().format('YYYY-MM-DD');
    const fregistro = currentDate;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            const pool = await sql.connect(dbConfig);

            // Verificar si el correo electrónico ya existe
            const checkEmailQuery = await pool
                .request()
                .input('email', sql.VarChar, email)
                .query('SELECT * FROM usuarioWeb WHERE email = @email');

            if (checkEmailQuery.recordset.length > 0) {
                return res.status(200).send({ message: 'El email ya existe. Por favor elija otro.', data: undefined });
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(password, 8); // El número 10 es el factor de coste para el cifrado
                    //crear el idUsuario con uuidv4
                     const idUsuario = uuidv4();


                    const pool = await sql.connect(dbConfig);
                    const result = await pool
                        .request()
                        .input('idUsuario', sql.UniqueIdentifier, idUsuario)
                        .input('idEmpresa', sql.UniqueIdentifier, req.user.empresa)
                        .input('nombres', sql.VarChar, nombres)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('email', sql.VarChar, email)
                        .input('password', sql.Text, hashedPassword)
                        .input('idRol', sql.VarChar, idRol)
                        .input('estado', sql.Bit, estado)
                        .input('fregistro', sql.Date, fregistro)
                        .query('INSERT INTO usuarioWeb (idUsuario, idEmpresa ,nombres, apellidos, email, password, idRol, estado, fregistro) VALUES (@idUsuario, @idEmpresa, @nombres, @apellidos, @email, @password, @idRol, @estado, @fregistro)');
                    // res.json({ message: 'Usuario creado correctamente' });}
                    console.log('valor de result:', result.rowsAffected);
                    let data = result.rowsAffected
                    res.status(200).send({ message: 'Usuario creado correctamente', data: data });
                } catch (error) {
                    console.error('Error al crear un usuario:', error);
                    res.status(200).send({ message: 'Error al crear un usuario', data: undefined });
                }
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }





};

const updateAdmin = async (req, res) => {
    //   const { name, apellidos, email, password, rol, estado } = req.body;
    const { nombres, apellidos, password, idRol } = req.body;
    const { id } = req.params;
    console.log('updateAdmin rol: ', idRol);

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                console.log('password : ', password);

                if (password.trim() == 'sin datos') {

                    //cuando viene sin password
                    console.log('cuando viene sin password');

                    const pool = await sql.connect(dbConfig);
                    const result = await pool
                        .request()
                        .input('idUsuario', sql.UniqueIdentifier, id)
                        .input('nombres', sql.VarChar, nombres)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('idRol', sql.UniqueIdentifier, idRol)
                        .input('idEmpresa', sql.UniqueIdentifier, req.user.empresa)

                        .query('UPDATE usuarioWeb SET nombres = @nombres, apellidos = @apellidos, idRol = @idRol WHERE idUsuario = @idUsuario and idEmpresa = @idEmpresa');
                    res.status(200).send({ message: 'Usuario actualizado correctamente', data: result.rowsAffected });

                } else {

                    //cuando viene con password
                    console.log('cuando viene con password')
                    const hashedPassword = await bcrypt.hash(password, 8);

                    const pool = await sql.connect(dbConfig);
                    const result = await pool
                        .request()
                        .input('idUsuario', sql.UniqueIdentifier, id)
                        .input('nombres', sql.VarChar, nombres)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('password', sql.Text, hashedPassword)
                        .input('idRol', sql.UniqueIdentifier, idRol)
                        .query('UPDATE usuarioWeb SET nombres = @nombres, apellidos = @apellidos, password = @password, idRol = @idRol WHERE idUsuario = @idUsuario');
                    res.status(200).send({ message: 'Usuario actualizado correctamente', data: result.rowsAffected });

                }

            } catch (error) {
                console.error('Error al actualizar un usuario:', error);
                res.status(500).send('Error al actualizar un usuario');
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }


};

// if (req.user) {
// if (req.user.rol == 'Administrador') {

// } else {
//    res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
// }
// }
// else {
//     res.status(500).send({ message: 'No Access' });
// }

const obtener_datos_colaborador_admin = async (req, res) => {
    const { id } = req.params;
    let data;

    console.log('obtener_datos_colaborador_admin = id: ', id);
    console.log('req.params antes de validar el usuario: ', req.user);
    

    if (req.user) {
        //quiero validar si el rol del usuario es administrador
        if (req.user.rol == 'Administrador') {
            console.log('despues de validar el user.rol: ', req.user.rol);
            try {

                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .input('idUsuario', sql.UniqueIdentifier, id)
                    .query('SELECT * FROM UsuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol where idUsuario = @idUsuario');
                //.query('SELECT * FROM UsuarioWeb where idUsuario = @idUsuario');



                //despues del codigo anterior no puedo optener respuesta a la consulta
                console.log('result.recordset: ', result.recordset);
                console.log('result.recordset: ', result.recordset[0].idUsuario);

                //quiero convertir el result.recordset.fregistro a un formato de fecha mas amigable
                let fecha = result.recordset[0].fregistro;
                let fecha2 = moment(fecha).format('DD-MM-YYYY');
                console.log('fecha2: ', fecha2);
                result.recordset[0].fregistro = fecha2;
                console.log('result.recordset[0].fregistro: ', result.recordset[0].fregistro);


                data = result.recordset;
                console.log('data: ', data);
                res.status(200).send({data: data });
                //res.json({ data });


            } catch (error) {
                console.error('Error al actualizar un usuario:', error);
                // res.status(500).send('Error al actualizar un usuario');
                res.status(200).send({ message: 'Error al actualizar un usuario', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }


    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};

const cambiar_estado_colaborador_admin = async function (req, res) {

    console.log('cambiar_estado_colaborador_admin: ', req.params);
    if (req.user) {

        //quiero validar si el rol del usuario es administrador
        if (req.user.rol == 'Administrador') {

            let id = req.params['id'];
            let data = req.body;
            let estado = data.estado;

            let nuevo_estado;

            // console.log('cambiar_estado_colaborador_admin: ', data);
            // console.log('id: ', id);


            if (data.estado) {
                nuevo_estado = false;
            } else if (!data.estado) {
                nuevo_estado = true;
            }

            console.log('nuevo estado: ', nuevo_estado);

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idUsuario', sql.UniqueIdentifier, id)
                .input('estado', sql.Bit, nuevo_estado)
                .query('UPDATE usuarioWeb SET estado = @estado WHERE idUsuario = @idUsuario');
            console.log(result.recordset);
            res.status(200).send({ data: result.recordset });
        } else {
            console.log('no es administrador');
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }



    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

const admin_login = async (req, res) => {
    const { email, password, ruc } = req.body;
    const estado = true;
    const data = req.body;
    console.log('entro a login admin')
    console.log(data);

    console.log('aqui valido si es el ruc correcto', ruc);
    //primero quiero validar si el ruc es correcto en la tabla de Empresas
    try {
        const pool = await sql.connect(dbConfig);
        const checkEmailQuery = await pool
            .request()
            .input('ruc', sql.VarChar, ruc)
            .query('SELECT * FROM Empresas where ruc = @ruc ');
        console.log('checkEmailQuery', checkEmailQuery);

        if (checkEmailQuery.recordset.length > 0) {
            console.log('el ruc existe');
            console.log('aqui valido si el email es correcto', email,'estado :', estado);

            const pool = await sql.connect(dbConfig);
            const checkEmailQuery = await pool
                .request()
                .input('email', sql.VarChar, email)
                .input('estado', sql.Bit, estado)
                //.query('SELECT * FROM UsuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol');
                .query('SELECT * FROM usuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol WHERE email = @email and estado=@estado');


            console.log('checkEmailQuery', checkEmailQuery);
            console.log(checkEmailQuery.recordset.length)

            if (checkEmailQuery.recordset.length > 0) {
                const bdPassword = checkEmailQuery.recordset[0].password;
                let user = checkEmailQuery.recordset[0];
                console.log('user respuesta de la bd', user);
                

                console.log('bdpassword', bdPassword);
                bcrypt.compare(password, bdPassword, (err, result) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).send('Error al comparar contraseñas');
                    } else if (result) {
                        // Las contraseñas coinciden, inicia sesión
                        res.status(200).send({
                            data: user,
                            token: jwt.createToken(user)
                        });
                        console.log('las contraseñas coinciden');
                    } else {
                        // Las contraseñas no coinciden, devuelve un mensaje de error
                        res.status(200).send({ message: 'La contraseña es incorrecta', data: undefined });
                    }
                });
            } else {
                // return res.status(400).json({ message: 'El email no existe. Por favor elija otro.' });
                res.status(200).send({ message: 'El email no existe o usted no tiene permisos para acceder' });
            }

        } else {
            console.log('el ruc no existe');
            res.status(200).send({ message: 'El ruc no existe', data: undefined });
        }
    } catch (error) {
        console.error('Error al obtener los usuriosa:', error);
        res.status(200).send({ data: undefined });
    }


};




const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .query('DELETE FROM usuarioWeb WHERE id = @id');
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar un Usuario:', error);
        res.status(500).send('Error al eliminar un Usuario');
    }
};


module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    admin_login,
    cambiar_estado_colaborador_admin,
    obtener_datos_colaborador_admin
};