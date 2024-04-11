const sql = require('mssql');
const dbConfig = require('../dbconfig');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('../helpers/jwt');

// CREATE TABLE Empresas(
// 	idEmpresa UNIQUEIDENTIFIER primary key NOT NULL,
// 	ruc varchar(11) NULL,
// 	razon_Social varchar(200) NULL,
// 	nombreComercial varchar(200) null,
// 	rubro varchar(200) NULL,
// 	celular varchar(11) NULL,
// 	whatsapp varchar(11) NULL,
// 	correo varchar(100) NULL,
// 	logo varbinary(max) NULL,
// 	alias varchar(10) NULL,
// 	estado bit NOT NULL
// )

const getEmpresas = async function (req, res) {

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            console.log('req.user.rol');
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .query('SELECT * FROM Empresas');
                // res.json(result.recordset);
                // console.log('result.recordset');
                // console.log(result.recordset);
                console.log('result:', result.recordset);
                res.status(200).send({ data: result.recordset });
            } catch (error) {
                console.error('Error al obtener las epresas:', error);
                res.status(200).send({ data: undefined });
            }
        }else{
            res.status(500).send({ message: 'No Access' });
        }



    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};

const getEmpresasById = async function (req, res) {

    const id = req.params.id;

    if (req.user) {
        //  if(req.user.rol=='Administrador'){
        console.log('req.user.rol:', req.user);
        try {
            const pool = await sql.connect(dbConfig);
            let result = await pool
                .request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Empresa WHERE id = @id');

            console.log('result:', result.recordset);
            res.json(result.recordset);
            // res.status(200).send({ data: result.recordset });
        } catch (error) {
            // console.error('Error al obtener los usuarios:', error);
            res.status(200).send({ data: undefined });
        }


    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};



const createEmpresa = async function (req, res) {
    console.log('entro a createEmpresa');
    const { Ruc, Razon_Social, Rubro, Direccion, Distrito, Region, Provincia, Celular, Whatsapp, Correo, Logo, Alias } = req.body;

    // const currentDate = moment().format('YYYY-MM-DD');
    // const fregistro = currentDate;
    // console.log(currentDate);
    // console.log(fregistro);
    const pool = await sql.connect(dbConfig);

    // Verificar si el correo electrónico ya existe
    const checkEmailQuery = await pool
        .request()
        .input('Ruc', sql.VarChar, Ruc)
        .query('SELECT * FROM Empresa WHERE Ruc = @Ruc');

    if (checkEmailQuery.recordset.length > 0) {
        return res.status(200).send({ message: 'La Empresa ya existe. Por favor registre una empresa diferente', data: undefined });
    } else {
        try {

            // Convertir buffer a cadena base64
            const base64String = Logo.toString('base64');

            // // Convertir cadena base64 a buffer
            // const restoredBuffer = Buffer.from(base64String, 'base64');

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('Ruc', sql.VarChar, Ruc)
                .input('Razon_Social', sql.VarChar, Razon_Social)
                .input('Rubro', sql.VarChar, Rubro)
                .input('Direccion', sql.VarChar, Direccion)
                .input('Distrito', sql.VarChar, Distrito)
                .input('Region', sql.VarChar, Region)
                .input('Provincia', sql.VarChar, Provincia)
                .input('Celular', sql.VarChar, Celular)
                .input('Whatsapp', sql.VarChar, Whatsapp)
                .input('Correo', sql.VarChar, Correo)
                .input('Logo', sql.VarBinary, base64String)
                .input('Alias', sql.VarChar, Alias)
                .query('INSERT INTO Empresa (Ruc, Razon_Social, Rubro, Direccion, Distrito, Region, Provincia, Celular, Whatsapp, Correo, Logo, Alias) VALUES (@Ruc, @Razon_Social, @Rubro, @Direccion, @Distrito, @Region, @Provincia, @Celular, @Whatsapp, @Correo, @Logo, @Alias, 1)');
            // res.json({ message: 'Usuario creado correctamente' });}
            console.log('valor de result:', result.rowsAffected);
            let data = result.rowsAffected
            res.status(200).send({ message: 'Empresa creada correctamente', data: data });
        } catch (error) {
            console.error('Error al crear la Empresa:', error);
            res.status(200).send({ message: 'Error al crear la Empresa', data: undefined });
        }
    }


};

const updateEmpresa = async (req, res) => {
    //   const { name, apellidos, email, password, rol, estado } = req.body;
    const { name, apellidos, password, rol } = req.body;
    const { id } = req.params;
    if (req.user) {
        try {


            console.log('cuando viene sin password');

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('Ruc', sql.VarChar, Ruc)
                .input('Razon_Social', sql.VarChar, Razon_Social)
                .input('Rubro', sql.VarChar, Rubro)
                .input('Direccion', sql.VarChar, Direccion)
                .input('Distrito', sql.VarChar, Distrito)
                .input('Region', sql.VarChar, Region)
                .input('Provincia', sql.VarChar, Provincia)
                .input('Celular', sql.VarChar, Celular)
                .input('Whatsapp', sql.VarChar, Whatsapp)
                .input('Correo', sql.VarChar, Correo)
                .input('Logo', sql.Image, Logo)
                .input('Alias', sql.VarChar, Alias)

                .query('UPDATE Empresa SET Razon_Social = @Razon_Social, Rubro = @Rubro, Direccion = @Direccion, Distrito = @Distrito, Region = @Region, Provincia = @Provincia, Celular = @Celular, Whatsapp = @Whatsapp, Correo = @Correo, Logo = @Logo, Alias = @Alias WHERE id = @id');
            res.status(200).send({ message: 'Empresa actualizado  correctamente', data: result.rowsAffected });



        } catch (error) {
            console.error('Error al actualizar un usuario:', error);
            res.status(500).send('Error al actualizar un usuario');
        }
    } else {
        res.status(401).send({ message: 'No Access' });
    }

};

//cambiar estado de la empresa
const cambiar_estado_empresa = async function (req, res) {
    if (req.user) {
        let idEmpresa = req.params['id'];
        const { estado } = req.body;

        if (!estado) {
            nuevo_estado = true;
        } else {
            nuevo_estado = false;
        }

        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idEmpresa', sql.Int, idEmpresa)
                .input('estado', sql.Bit, nuevo_estado)
                .query('UPDATE Empresa SET estado = @estado WHERE idEmpresa = @idEmpresa');
        } catch (error) {

        }

    }
}

const obtener_datos_colaborador_admin = async (req, res) => {
    const { id } = req.params;
    let data;

    if (req.user) {

        try {

            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query('SELECT * FROM usuarioWeb where id =' + id);
            // const result = await pool
            //     .request()
            //     .input('id', sql.Int, id)
            //     .query('SELECT * FROM usuarioWeb WHERE email = @id');
            // res.json({ message: 'Usuario actualizado correctamente' });
            console.log(result.recordset);
            data = result.recordset;
            console.log('data: ', data);
            // res.status(200).send({data: data });
            res.json({ data });


        } catch (error) {
            console.error('Error al actualizar un usuario:', error);
            // res.status(500).send('Error al actualizar un usuario');
            res.status(200).send({ message: 'Error al actualizar un usuario', data: undefined });
        }
    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};

const cambiar_estado_colaborador_admin = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;
        let estado = data.estado;

        let nuevo_estado;

        console.log('cambiar_estado_colaborador_admin: ', data);
        console.log('id: ', id);


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
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

// const admin_login = async (req, res) => {
//     const { email, password } = req.body;
//     const estado = true;
//     const data = req.body;
//     console.log('entro a login admin')
//     console.log(data);

//     const pool = await sql.connect(dbConfig);
//     const checkEmailQuery = await pool
//         .request()
//         .input('email', sql.VarChar, email)
//         .input('estado', sql.Bit, estado)
//         .query('SELECT * FROM usuarioWeb WHERE email = @email and estado=@estado');

//     console.log('checkEmailQuery');
//     console.log(checkEmailQuery.recordset.length)
//     if (checkEmailQuery.recordset.length > 0) {
//         const bdPassword = checkEmailQuery.recordset[0].password;
//         let user = checkEmailQuery.recordset[0];
//         console.log('user');
//         console.log(user);

//         console.log(bdPassword);
//         bcrypt.compare(password, bdPassword, (err, result) => {
//             if (err) {
//                 console.error('Error al comparar contraseñas:', err);
//                 res.status(500).send('Error al comparar contraseñas');
//             } else if (result) {

//                 res.status(200).send({
//                     data: user,
//                     token: jwt.createToken(user)
//                 });
//                 console.log('las contraseñas coinciden');
//             } else {

//                 res.status(200).send({ message: 'La contraseña es incorrecta', data: undefined });
//             }
//         });
//     } else {

//         res.status(200).send({ message: 'El email no existe o usted no tiene permisos para acceder' });
//     }
// };




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
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    cambiar_estado_empresa,
    deleteAdmin,
    // admin_login,
    cambiar_estado_colaborador_admin,
    obtener_datos_colaborador_admin,
    getEmpresasById
};