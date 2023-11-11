const sql = require('mssql');
const dbConfig = require('../dbconfig');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('../helpers/jwt');


const getAdmin = async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM usuarioWeb');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

// const createAdmin = async (req, res) => {
//   const { name, apellidos, email, password, rol, estado } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 8); // El número 10 es el factor de coste para el cifrado

//     const pool = await sql.connect(dbConfig);
//     const result = await pool
//       .request()
//       .input('name', sql.VarChar, name)
//       .input('apellidos', sql.VarChar, apellidos)
//       .input('email', sql.VarChar, email)
//       .input('password', sql.Text, hashedPassword)
//       .input('rol', sql.NChar, rol)
//       .input('estado', sql.Bit, estado)
//       .query('INSERT INTO usuarioWeb (name, apellidos, email, password, rol, estado) VALUES (@name, @apellidos, @email, @password, @rol, @estado)');
//     res.json({ message: 'Administrador creado correctamente' });
//   } catch (error) {
//     console.error('Error al crear un administrador:', error);
//     res.status(500).send('Error al crear un administrador');
//   }
// };

const createAdmin = async (req, res) => {
    const { name, apellidos, email, password, rol, estado } = req.body;

    const currentDate  = moment().format('YYYY-MM-DD');
    const fregistro = currentDate;
    console.log(currentDate);
    console.log(fregistro);
    const pool = await sql.connect(dbConfig);
    
    // Verificar si el correo electrónico ya existe
    const checkEmailQuery = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM usuarioWeb WHERE email = @email');
      
    if (checkEmailQuery.recordset.length > 0) {
      return res.status(400).json({ message: 'El email ya existe. Por favor elija otro.' });
    }else{
        try {
            const hashedPassword = await bcrypt.hash(password, 8); // El número 10 es el factor de coste para el cifrado
    
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input('name', sql.VarChar, name)
                .input('apellidos', sql.VarChar, apellidos)
                .input('email', sql.VarChar, email)
                .input('password', sql.Text, hashedPassword)
                .input('rol', sql.NChar, rol)
                .input('estado', sql.Bit, estado)
                .input('fregistro', sql.Date, fregistro)
                .query('INSERT INTO usuarioWeb (name, apellidos, email, password, rol, estado, fregistro) VALUES (@name, @apellidos, @email, @password, @rol, @estado, @fregistro)');
            res.json({ message: 'Usuario creado correctamente' });
        } catch (error) {
            console.error('Error al crear un usuario:', error);
            res.status(500).send('Error al crear un usuario');
        }
    }

    
};

const updateAdmin = async (req, res) => {
    //   const { name, apellidos, email, password, rol, estado } = req.body;
    const { name, apellidos, password, rol, estado } = req.body;
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('apellidos', sql.VarChar, apellidos)
            .input('password', sql.Text, password)
            .input('rol', sql.NChar, rol)
            .input('estado', sql.Bit, estado)
            .query('UPDATE usuarioWeb SET name = @name, apellidos = @apellidos, password = @password, rol = @rol, estado = @estado WHERE id = @id');
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        res.status(500).send('Error al actualizar un usuario');
    }
};


const getAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = req.body;

    const pool = await sql.connect(dbConfig);
    const checkEmailQuery = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM usuarioWeb WHERE email = @email');
      
      console.log('checkEmailQuery');
      console.log(checkEmailQuery)
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
            } else {
                // Las contraseñas no coinciden, devuelve un mensaje de error
                res.status(400).json({ message: 'La contraseña es incorrecta' });
            }
        });
    } else {
        return res.status(400).json({ message: 'El email no existe. Por favor elija otro.' });
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
    getAdminLogin
};