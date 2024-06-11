const sql = require('mssql');
const dbConfig = require('../dbconfig');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('../helpers/jwt');
const { v4: uuidv4 } = require('uuid');
const { max } = require('moment/moment');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

// CREATE TABLE Empresas(
// 	idEmpresa UNIQUEIDENTIFIER primary key NOT NULL,
// 	idDocumento varchar(1) not null,
// 	ruc varchar(11) not NULL,
// 	razon_Social varchar(200) not NULL,
// 	nombreComercial varchar(200) null,
// 	rubro varchar(200) NULL,
// 	celular varchar(11) NULL,
// 	correo varchar(100) not NULL,
// 	password text not null,
// 	logo varbinary(max) NULL,
// 	alias varchar(10) NULL,
// 	condicion varchar(20) null,
// 	estSunat varchar(20) null,
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
                res.status(200).send({ data: result.recordset[0] });
            } catch (error) {
                console.error('Error al obtener las epresas:', error);
                res.status(200).send({ data: undefined });
            }
        } else {
            res.status(500).send({ message: 'No Access' });
        }



    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};

const getEmpresasById = async function (req, res) {
    console.log('entro a getEmpresasById', req.params);
    const id = req.params.id;

    if (req.user) {
        //  if(req.user.rol=='Administrador'){
        console.log('req.user.rol:', req.user);
        try {
            const pool = await sql.connect(dbConfig);
            let result = await pool
                .request()
                .input('idEmpresa', sql.UniqueIdentifier, id)
                .query('SELECT * FROM Empresas WHERE idEmpresa = @idEmpresa');

            console.log('result:', result.recordset);
            //res.json(result.recordset);
            res.status(200).send({ data: result.recordset });
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send({ data: undefined });
        }

    }
    else {
        res.status(500).send({ message: 'No Access' });
    }
};



// const createEmpresa = async function (req, res) {
//     console.log('entro a createEmpresa');
//     const { Ruc, Razon_Social, Rubro, Direccion, Distrito, Region, Provincia, Celular, Whatsapp, Correo, Logo, Alias } = req.body;

//     // const currentDate = moment().format('YYYY-MM-DD');
//     // const fregistro = currentDate;
//     // console.log(currentDate);
//     // console.log(fregistro);
//     const pool = await sql.connect(dbConfig);

//     // Verificar si el correo electrónico ya existe
//     const checkEmailQuery = await pool
//         .request()
//         .input('Ruc', sql.VarChar, Ruc)
//         .query('SELECT * FROM Empresa WHERE Ruc = @Ruc');

//     if (checkEmailQuery.recordset.length > 0) {
//         return res.status(200).send({ message: 'La Empresa ya existe. Por favor registre una empresa diferente', data: undefined });
//     } else {
//         try {

//             // Convertir buffer a cadena base64
//             const base64String = Logo.toString('base64');

//             // // Convertir cadena base64 a buffer
//             // const restoredBuffer = Buffer.from(base64String, 'base64');

//             const pool = await sql.connect(dbConfig);
//             const result = await pool
//                 .request()
//                 .input('Ruc', sql.VarChar, Ruc)
//                 .input('Razon_Social', sql.VarChar, Razon_Social)
//                 .input('Rubro', sql.VarChar, Rubro)
//                 .input('Direccion', sql.VarChar, Direccion)
//                 .input('Distrito', sql.VarChar, Distrito)
//                 .input('Region', sql.VarChar, Region)
//                 .input('Provincia', sql.VarChar, Provincia)
//                 .input('Celular', sql.VarChar, Celular)
//                 .input('Whatsapp', sql.VarChar, Whatsapp)
//                 .input('Correo', sql.VarChar, Correo)
//                 .input('Logo', sql.VarBinary, base64String)
//                 .input('Alias', sql.VarChar, Alias)
//                 .query('INSERT INTO Empresa (Ruc, Razon_Social, Rubro, Direccion, Distrito, Region, Provincia, Celular, Whatsapp, Correo, Logo, Alias) VALUES (@Ruc, @Razon_Social, @Rubro, @Direccion, @Distrito, @Region, @Provincia, @Celular, @Whatsapp, @Correo, @Logo, @Alias, 1)');
//             // res.json({ message: 'Usuario creado correctamente' });}
//             console.log('valor de result:', result.rowsAffected);
//             let data = result.rowsAffected
//             res.status(200).send({ message: 'Empresa creada correctamente', data: data });
//         } catch (error) {
//             console.error('Error al crear la Empresa:', error);
//             res.status(200).send({ message: 'Error al crear la Empresa', data: undefined });
//         }
//     }


// };

const createEmpresa = async function (req, res) {
    console.log('entro a createEmpresa', req.body);
    const { idDocumento, ruc, razon_Social, nombre_Comercial, rubro, celular, logo, correo, password, alias, condicion, estSunat } = req.body;

    const currentDate = moment().format('YYYY-MM-DD');
    const fregistro = currentDate;
    console.log(currentDate);

    const pool = await sql.connect(dbConfig);

    // Verificar si el correo electrónico ya existe
    const checkEmailQuery = await pool
        .request()
        .input('Ruc', sql.VarChar, ruc)
        .query('SELECT * FROM Empresas WHERE ruc = @ruc');

    console.log('checkEmailQuery.recordset:', checkEmailQuery.recordset);

    if (checkEmailQuery.recordset.length > 0) {

        return res.status(200).send({ message: 'La Empresa ya existe. Por favor registre una empresa diferente', data: undefined });
    } else {
        try {
            // Convertir buffer a cadena base64
            const hashedPassword = await bcrypt.hash(password, 8); // El número 10 es el factor de coste para el cifrado
            //crear el idUsuario con uuidv4
            const idEmpresa = uuidv4();

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('idDocumento', sql.VarChar(1), idDocumento)
                .input('ruc', sql.VarChar, ruc)
                .input('razon_Social', sql.VarChar, razon_Social)
                .input('nombreComercial', sql.VarChar, nombre_Comercial)
                .input('rubro', sql.VarChar, rubro)
                .input('celular', sql.VarChar, celular)
                .input('correo', sql.VarChar, correo)
                .input('password', sql.Text, hashedPassword)
                .input('logo', sql.VarBinary(sql.MAX), null)
                .input('alias', sql.VarChar, alias)
                .input('condicion', sql.VarChar, condicion)
                .input('estSunat', sql.VarChar, estSunat)
                .input('estado', sql.Bit, 1)
                .input('fregistro', sql.DateTime, fregistro)
                .query('INSERT INTO Empresas (idEmpresa, idDocumento, ruc, razon_Social, nombreComercial, rubro, celular, correo, password, logo, alias, condicion, estSunat, estado, fregistro) VALUES (@idEmpresa, @idDocumento, @ruc, @razon_Social, @nombreComercial, @rubro, @celular, @correo, @password, @logo, @alias, @condicion, @estSunat, @estado, @fregistro)');


            console.log('valor de result:', idEmpresa);

            res.status(200).send({ data: idEmpresa });
        }
        catch (error) {
            console.error('Error al crear la Empresa:', error);
            res.status(500).send({ data: undefined });
        }
    }
}



const updateEmpresa = async function (req, res) {
    console.log('entro a updateEmpresa', req.body, req.params);
    console.log('req.file', req.files);
    console.log('logo', req.body.logo)


    const {
        idDocumento, ruc, razon_Social, nombreComercial, rubro, celular, correo, password, alias, condicion, estSunat, logoAnterior
    } = req.body;

    const idEmpresa = req.user.empresa;
    console.log('logoAnterior', logoAnterior);

    if (req.user) {
        if (req.files && req.files.logo) {
            // Si hay imagen

            var img_path = req.files.logo.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            console.log('portada_name', portada_name);

            // Aquí puedes actualizar la base de datos con la imagen
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('Rubro', sql.VarChar, rubro)
                    .input('Celular', sql.VarChar, celular)
                    .input('nombreComercial', sql.VarChar, nombreComercial)
                    .input('Correo', sql.VarChar, correo)
                    .input('Logo', sql.VarChar, portada_name)
                    .input('Alias', sql.VarChar, alias)
                    .query('UPDATE Empresas SET Rubro = @Rubro, Celular = @Celular, nombreComercial = @nombreComercial, Correo = @Correo, Logo = @Logo, Alias = @Alias WHERE idEmpresa = @idEmpresa');

                if (logoAnterior) {
                    fs.unlink('./uploads/configuraciones/' + logoAnterior, (err) => {
                        if (err) throw err;
                        // Archivo eliminado correctamente
                    });
                } else {
                    console.log('No se proporcionó un nombre de archivo válido para eliminar.');
                }



                res.status(200).send({ message: 'Empresa actualizada correctamente', data: result.rowsAffected });

            } catch (error) {
                console.error('Error al actualizar la empresa:', error);
                res.status(500).send('Error al actualizar la empresa');
            }
            // });
        } else {
            // Si no hay imagen
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('Rubro', sql.VarChar, rubro)
                    .input('Celular', sql.VarChar, celular)
                    .input('nombreComercial', sql.VarChar, nombreComercial)
                    .input('Correo', sql.VarChar, correo)
                    .input('Alias', sql.VarChar, alias)
                    .query('UPDATE Empresas SET Rubro = @Rubro, Celular = @Celular, nombreComercial = @nombreComercial, Correo = @Correo, Alias = @Alias WHERE idEmpresa = @idEmpresa');
                res.status(200).send({ message: 'Empresa actualizada correctamente', data: result.rowsAffected });

            } catch (error) {
                console.error('Error al actualizar la empresa:', error);
                res.status(500).send('Error al actualizar la empresa');
            }
        }
    } else {
        res.status(401).send({ message: 'No Access' });
    }

};


const cambiar_estado_empresa = async function (req, res) {
    console.log('entro a cambiar_estado_empresa', req.params);
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
                .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                .input('estado', sql.Bit, nuevo_estado)
                .query('UPDATE Empresas SET estado = @estado WHERE idEmpresa = @idEmpresa');
            res.status(200).send({ data: result.rowsAffected });
        } catch (error) {
            console.error('Error al cambiar el estado de la empresa:', error);
            res.status(500).send({ data: undefined });

        }

    }
}

const obtener_logo = async function (req, res) {
    console.log('entro a obtener_logo', req.params);
    var img = req.params['img'];


    fs.stat('./uploads/configuraciones/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/configuraciones/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = 'assets/img/01.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
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





// CREATE TABLE DireccionEmpresa (
//     idDireccionEmpresa INT IDENTITY(1,1) PRIMARY KEY not null,
// 	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
//     ubigeo varchar(10) null,
// 	codPais varchar(10) null,
//     region varchar(50) NULL,
// 	provincia varchar(50) NULL,
// 	distrito varchar(50) NULL,
// 	urbanizacion varchar(100) null,
// 	direccion VARCHAR(255) null,
// 	codLocal varchar(10) null
//  principal bit no null
// );

const createDireccionEmpresa = async function (req, res) {
    console.log('crearDireccionEmpresa req.body', req.body);
    console.log('req.user', req.user);

    // if (req.user) {
    //     if (req.user.rol == 'Administrador') {

            try {
                let idEmpresa = req.body.idEmpresa;
                let ubigeo = req.body.ubigeo;
                let codPais = req.body.codpais;
                let region = req.body.region;
                let provincia = req.body.provincia;
                let distrito = req.body.distrito;
                let urbanizacion = req.body.urbanizacion;
                let direccion = req.body.direccion;
                let codLocal = '0';
                let principal = true;

                let pool = await sql.connect(dbConfig);
                let insertDireccionEmpresa = await pool.request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .input('ubigeo', sql.VarChar, ubigeo)
                    .input('codPais', sql.VarChar, codPais)
                    .input('region', sql.VarChar, region)
                    .input('provincia', sql.VarChar, provincia)
                    .input('distrito', sql.VarChar, distrito)
                    .input('urbanizacion', sql.VarChar, urbanizacion)
                    .input('direccion', sql.VarChar, direccion)
                    .input('codLocal', sql.VarChar, codLocal)
                    .input('principal', sql.Bit, principal)
                    .query('insert into DireccionEmpresa (idEmpresa,ubigeo,codPais,region,provincia,distrito,urbanizacion,direccion,codLocal, principal) values (@idEmpresa,@ubigeo,@codPais,@region,@provincia,@distrito,@urbanizacion,@direccion,@codLocal,@principal)');


                res.status(200).send({ data: insertDireccionEmpresa.rowsAffected });
            } catch (error) {
                console.log('error', error);
                res.status(500).send({ message: error.message, data: undefined });

            }

    //     }
    //     else {
    //         res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
    //     }
    // }
    // else {
    //     res.status(500).send({ message: 'No Access' });
    // }

}

const updateDireccionEmpresa = async function (req, res) {
    console.log('entro a updateDireccionEmpresa', req.body);
    const { idDireccionEmpresa, ubigeo, codPais, region, provincia, distrito, urbanizacion, direccion, codLocal, principal } = req.body;
    const id = idDireccionEmpresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .input('id', sql.Int, id)
                    .input('ubigeo', sql.VarChar, ubigeo)
                    .input('codPais', sql.VarChar, codPais)
                    .input('region', sql.VarChar, region)
                    .input('provincia', sql.VarChar, provincia)
                    .input('distrito', sql.VarChar, distrito)
                    .input('urbanizacion', sql.VarChar, urbanizacion)
                    .input('direccion', sql.VarChar, direccion)
                    .input('codLocal', sql.VarChar, codLocal)
                    .input('principal', sql.Bit, principal)
                    .query('UPDATE DireccionEmpresa SET ubigeo = @ubigeo, codPais = @codPais, region = @region, provincia = @provincia, distrito = @distrito, urbanizacion = @urbanizacion, direccion = @direccion, codLocal = @codLocal, principal = @principal WHERE idDireccionEmpresa = @id');
                res.status(200).send({ data: result.rowsAffected });
            } catch (error) {
                console.error('Error al actualizar un DireccionEmpresa:', error);
                res.status(500).send('Error al actualizar un DireccionEmpresa');
            }
        }
        else {
            res.status(401).send({ message: 'No Access' });
        }
    } else {
        res.status(401).send({ message: 'No Access' });
    }
}

const getDireccionEmpresa_id = async function (req, res) {
    console.log('entro a getDireccionEmpresa_id', req.params);
    const idEmpresa = req.params.id;
    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                const pool = await sql.connect(dbConfig);
                const result = await pool
                    .request()
                    .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
                    .query('SELECT * FROM DireccionEmpresa WHERE idEmpresa = @idEmpresa');
                res.status(200).send({ data: result.recordset });
            } catch (error) {
                console.error('Error al obtener las direcciones de la empresa:', error);
                res.status(500).send('Error al obtener las direcciones de la empresa');
            }
        }
        else {
            res.status(401).send({ message: 'No Access' });
        }

    } else {
        res.status(401).send({ message: 'No Access' });
    }
}

// const getDirecciones_empresa = async function (req, res) {
//     console.log('entro a getDirecciones_empresa', req.params);
//     const idEmpresa = req.params.id;

//     if (req.user) {
//         if (req.user.rol == 'Administrador') {
//             try {
//                 const pool = await sql.connect(dbConfig);
//                 const result = await pool
//                     .request()
//                     .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
//                     .query('SELECT * FROM DireccionEmpresa WHERE idEmpresa = @idEmpresa');
//                 res.json(result.recordset);
//             } catch (error) {
//                 console.error('Error al obtener las direcciones de la empresa:', error);
//                 res.status(500).send('Error al obtener las direcciones de la empresa');
//             }
//         }
//         else {
//             res.status(401).send({ message: 'No Access' });
//         }

//     } else {
//         res.status(401).send({ message: 'No Access' });
//     }
// }


// const getDireccionEmpresa = async function (req, res) {
//     if (req.user) {
//         if (req.user.rol == 'Administrador') {
//             try {
//                 const pool = await sql.connect(dbConfig);
//                 const result = await pool
//                     .request()
//                     .query('SELECT * FROM DireccionEmpresa');
//                 res.json(result.recordset);
//             } catch (error) {
//                 console.error('Error al obtener las direcciones de la empresa:', error);
//                 res.status(500).send('Error al obtener las direcciones de la empresa');
//             }
//         }
//         else {
//             res.status(401).send({ message: 'No Access' });
//         }

//     } else {
//         res.status(401).send({ message: 'No Access' });
//     }
// }


module.exports = {
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    cambiar_estado_empresa,
    deleteAdmin,
    // admin_login,
    cambiar_estado_colaborador_admin,
    obtener_datos_colaborador_admin,
    getEmpresasById,
    getDireccionEmpresa_id,
    createDireccionEmpresa,
    updateDireccionEmpresa,

    //logo
    obtener_logo

    //direcciones de la empresa




};