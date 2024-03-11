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
                let productos = await pool.request().query("SELECT * FROM Productos");

                //quiero traer todos los productos con sus tablas relacionadas (idCategoria, idPresentacion) de la base de datos usando inner join
                //let productos = await pool.request().query("SELECT * FROM Productos INNER JOIN Categorias ON Productos.idCategoria = Categorias.idCategoria INNER JOIN Presentacion ON Productos.idPresentacion = Presentacion.idPresentacion");
                
                //quiero recorrer el array de productos.recordset y formatear la fecha de produccion y vencimiento por cada producto
                // productos.recordset.forEach(element => {
                //     let fProduccion = element.fProduccion;
                //     // Ejemplo de uso
                //     let fechaFormateada = convertirFormato(fProduccion);
                //     element.fProduccion = fechaFormateada;

                //     let fVencimiento = element.fVencimiento;
                //     // Ejemplo de uso
                //     let fechaFormateada2 = convertirFormato(fVencimiento);
                //     element.fVencimiento = fechaFormateada2;
                // });

                //let data = productos.recordset;

                //console.log('productos ', productos.recordset);

                res.status(200).send({ data: productos.recordset});
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
                res.status(200).send({ data: productos.recordset });
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
    const { Codigo, idCategoria, descripcion, idPresentacion, cUnitario, fProduccion, fVencimiento, facturar } = req.body;

    console.log('crear producto ', req.body);
    //crear id unico
    const idProducto = uuidv4();
    const idEmpresa = req.user.empresa;
    const idUsuario = req.user.sub;
    //console.log('idUsuario ', idUsuario);
   
    //obtener fecha actual
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    //dar formato a la fecha datetime
    const FIngreso = yyyy + '-' + mm + '-' + dd;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let productos = await pool
                    .request()
                    .input("idProducto", sql.UniqueIdentifier, idProducto)
                    .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                    .input("Codigo", sql.VarChar, Codigo.toString())
                    .input("idCategoria", sql.Int, idCategoria)
                    .input("descripcion", sql.VarChar, descripcion)
                    .input("idPresentacion", sql.Int, idPresentacion)
                    .input("cUnitario", sql.Decimal, cUnitario)
                    .input("fProduccion", sql.VarChar, fProduccion)
                    .input("fVencimiento", sql.VarChar, fVencimiento)
                    .input("alertaMinimo", sql.Decimal, 5)
                    .input("alertaMaximo", sql.Decimal, 50)
                    .input("VecesVendidas", sql.Int, 0)
                    .input("facturar", sql.VarChar, facturar)
                    .input("idUsuario", sql.UniqueIdentifier, idUsuario)
                    .input("FIngreso", sql.DateTime, FIngreso)
                    .query("INSERT INTO Productos VALUES (@idProducto, @idEmpresa, @Codigo, @idCategoria, @descripcion, @idPresentacion, @cUnitario, @fProduccion, @fVencimiento, @alertaMinimo, @alertaMaximo, @VecesVendidas, @facturar, @idUsuario, @FIngreso)");

                    
                    //if(productos.rowsAffected == 1){
                        res.status(200).send({ data: idProducto });
                    // }else{
                    //     res.status(500).send({ message: 'Error al crear los productos', data: undefined });
                    // }
                    console.log('producto creado ', idProducto);
                
            } catch (error) {
                console.log('crear productos error: ' + error);
                res.status(500).send({ message: 'Error al crear los productos', data: undefined });
            }

        } else {
            console.log('no tiene permisos');
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }
    else {
        console.log('no tiene acceso');
        res.status(500).send({ message: 'No Access', data: undefined });
    }


}

const actualizar_producto = async (req, res) => {
    const idProducto = req.params.id;
    const { Codigo, idCategoria, descripcion, idPresentacion, cUnitario, fProduccion, fVencimiento } = req.body;

        console.log('actualizar producto ', req.body);
        console.log('idProducto ', req.params.id)

    if (req.user) {
        //if (req.user.rol == 'Administrador') {
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
                    .query("UPDATE Productos SET Codigo = @Codigo, idCategoria = @idCategoria, descripcion = @descripcion, idPresentacion = @idPresentacion, cUnitario = @cUnitario, fProduccion = @fProduccion, fVencimiento = @fVencimiento WHERE idProducto = @idProducto");
                    
                console.log('productosresult ', productos.rowsAffected);
                res.status(200).send({ data: productos.rowsAffected });
            } catch (error) {
                console.log('actualizar productos error: ' + error);
                res.status(200).send({ message: 'Error al actualizar los productos', data: undefined });
            }
        // } else {
        //     res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        // }
    } else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

const eliminar_producto = async function(req, res) {
    const idProducto = req.params.id;
    let idEmpresa = req.user.empresa;

    if (req.user) {
        if (req.user.rol == 'Administrador') {
            try {
                let pool = await sql.connect(dbConfig);
                let productos = await pool
                .request()
                .input("idProducto", sql.UniqueIdentifier, idProducto)
                .input("idEmpresa", sql.UniqueIdentifier, idEmpresa)
                .query("DELETE FROM Productos WHERE idProducto = @idProducto AND idEmpresa = @idEmpresa");
                
                res.status(200).send({data:productos.rowsAffected});
            } catch (error) {
                console.log('eliminar productos error: ' + error);
                res.status(500).send({ message: 'Error al eliminar los productos', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No tiene permisos para realizar esta acción', data: undefined });
        }
    }else {
        res.status(500).send({ message: 'No Access', data: undefined });
    }
}

function convertirFormato(fechaString) {
    // Mapea los nombres de los meses en español a sus equivalentes numéricos
    const meses = {
        Ene: '01',
        Feb: '02',
        Mar: '03',
        Abr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Ago: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dic: '12'
    };

    // Divide la cadena en partes
    console.log('fechaString ', fechaString);
    const partes = fechaString.split(' ');

    console.log('partes ', partes);
    // Extrae el mes, día y año
    const mes = meses[partes[0]];
    const dia = partes[1].padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const ano = partes[2];

    // Formatea la fecha
    const fechaFormateada = `${ano}-${mes}-${dia}`;

    return fechaFormateada;
}





module.exports = {
    obtener_productos_todos,
    obtener_productos_id,
    crear_producto,
    actualizar_producto,
    eliminar_producto

}