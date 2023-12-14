const sql = require('mssql');
const dbConfig = require('../dbconfig');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('../helpers/jwt');


const getAdmin = async function (req, res) {

    if (req.user) {

        if (req.user.rol == 'Administrador') {

            //  if(req.user.rol=='Administrador'){
            console.log('req.user.rol', req.user.rol);
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool.request().query('SELECT * FROM usuarioWeb');
                // res.json(result.recordset);
                // console.log('result.recordset');
                // console.log(result.recordset);
                res.status(200).send({ data: result.recordset });
            } catch (error) {
                // console.error('Error al obtener los usuarios:', error);
                res.status(200).send({ data: undefined });
            }

        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};



const createAdmin = async (req, res) => {
    const { name, apellidos, email, password, rol, estado } = req.body;

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

                    const pool = await sql.connect(dbConfig);
                    const result = await pool
                        .request()
                        .input('name', sql.VarChar, name)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('email', sql.VarChar, email)
                        .input('password', sql.Text, hashedPassword)
                        .input('rol', sql.VarChar, rol)
                        .input('estado', sql.Bit, estado)
                        .input('fregistro', sql.Date, fregistro)
                        .query('INSERT INTO usuarioWeb (name, apellidos, email, password, rol, estado, fregistro) VALUES (@name, @apellidos, @email, @password, @rol, @estado, @fregistro)');
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
    const { name, apellidos, password, rol } = req.body;
    const { id } = req.params;

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
                        .input('id', sql.Int, id)
                        .input('name', sql.VarChar, name)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('rol', sql.VarChar, rol)

                        .query('UPDATE usuarioWeb SET name = @name, apellidos = @apellidos, rol = @rol WHERE id = @id');
                    res.status(200).send({ message: 'Usuario actualizado correctamente', data: result.rowsAffected });

                } else {

                    //cuando viene con password
                    console.log('cuando viene con password')
                    const hashedPassword = await bcrypt.hash(password, 8);

                    const pool = await sql.connect(dbConfig);
                    const result = await pool
                        .request()
                        .input('id', sql.Int, id)
                        .input('name', sql.VarChar, name)
                        .input('apellidos', sql.VarChar, apellidos)
                        .input('password', sql.Text, hashedPassword)
                        .input('rol', sql.VarChar, rol)
                        .query('UPDATE usuarioWeb SET name = @name, apellidos = @apellidos, password = @password, rol = @rol WHERE id = @id');
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

    if (req.user) {
        //quiero validar si el rol del usuario es administrador
        if (req.user.rol == 'Administrador') {
            try {

                const pool = await sql.connect(dbConfig);
                const result = await pool.request().query('SELECT * FROM usuarioWeb where id =' + id);


                data = result.recordset;
                console.log('data: ', data);
                // res.status(200).send({data: data });
                res.json({ data });


            } catch (error) {
                //console.error('Error al actualizar un usuario:', error);
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
                .input('id', sql.Int, id)
                .input('estado', sql.Bit, nuevo_estado)
                .query('UPDATE usuarioWeb SET estado = @estado WHERE id = @id');
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
    const { email, password } = req.body;
    const estado = true;
    const data = req.body;
    console.log('entro a login admin')
    console.log(data);

    const pool = await sql.connect(dbConfig);
    const checkEmailQuery = await pool
        .request()
        .input('email', sql.VarChar, email)
        .input('estado', sql.Bit, estado)
        .query('SELECT * FROM UsuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol');
        // .query('SELECT * FROM usuarioWeb WHERE email = @email and estado=@estado');


    console.log('checkEmailQuery',checkEmailQuery);
    console.log(checkEmailQuery.recordset.length)
    if (checkEmailQuery.recordset.length > 0) {
        const bdPassword = checkEmailQuery.recordset[0].password;
        let user = checkEmailQuery.recordset[0];
        console.log('user');
        console.log(user);

        console.log(bdPassword);
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