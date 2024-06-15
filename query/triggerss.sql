--drop TRIGGER CrearRolYUsuario

CREATE TRIGGER CrearRolYUsuario
ON Empresas
AFTER INSERT
AS
BEGIN
    DECLARE @IdNuevoRol UNIQUEIDENTIFIER;
    DECLARE @idEmpresa UNIQUEIDENTIFIER;

    -- Insertar un nuevo rol con datos predeterminados
    SET @IdNuevoRol = NEWID();
    INSERT INTO Rol (idRol, idEmpresa, descripcion)
    SELECT @IdNuevoRol, idEmpresa, 'Administrador'
    FROM inserted;

    -- Insertar un nuevo usuario con el Id del rol predeterminado
    INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
    SELECT NEWID(), idEmpresa, 'Predeterminado', 'Predeterminado', correo , '$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby', @IdNuevoRol, '1', GETDATE()
    FROM inserted;
END;

----------------------------------------------------------------
-- Crear trigger para insertar en Sucursal al agregar una nueva dirección en DireccionEmpresa
drop trigger trg_AfterInsert_DireccionEmpresa
--CREATE TRIGGER trg_AfterInsert_DireccionEmpresa
--ON DireccionEmpresa
--AFTER INSERT
--AS
--BEGIN
--    DECLARE @idEmpresa UNIQUEIDENTIFIER;
--    DECLARE @direccion VARCHAR(255);
    
--    -- Obtener valores de la fila insertada
--    SELECT 
--        @idEmpresa = idEmpresa,
--        @direccion = direccion
--    FROM inserted;
    
--    -- Insertar nueva sucursal
--    INSERT INTO Sucursal (
--        idSucursal,
--        idEmpresa,
--        nombre,
--        direccion,
--        idUsuario,
--        fregistro,
--        estado
--    )
--    VALUES (
--        NEWID(), -- Generar un nuevo id único para idSucursal
--        @idEmpresa,
--        'Sucursal Nueva', -- Nombre de la sucursal, puedes ajustarlo según sea necesario
--        @direccion,
--        '00000000-0000-0000-0000-000000000000', -- ID de usuario ficticio, cámbialo según sea necesario
--        GETDATE(),
--        1 -- Estado activo
--    );
--END;
--GO

select * from DireccionEmpresa
select * from Sucursal




--crear correlativo cada vez que se agregue una nueva empresa
CREATE TRIGGER TR_CrearCorrelativo
ON Empresas
AFTER INSERT
AS
BEGIN
    DECLARE @idEmpresa UNIQUEIDENTIFIER;
    DECLARE @numero int;

    -- Obtener el idEmpresa y el número deseado para el nuevo registro de Correlativos
    SELECT @idEmpresa = idEmpresa, @numero = 10000 FROM inserted;

    -- Insertar el nuevo registro en Correlativos
    INSERT INTO Correlativos (idEmpresa, numero)
    VALUES (@idEmpresa, @numero);
END;



--se registrara un nuevo registro por cada nuevo producto que se agrege a los productos
--drop trigger InsertarUnidadesPorCaja
CREATE TRIGGER InsertarUnidadesPorCaja
ON Productos
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insertar un nuevo registro en UnidadesPorCaja para cada producto insertado
    INSERT INTO UnidadesPorCaja (idProducto, unidxCaja, pesoUnidad, pesoCaja)
    SELECT
        idProducto,
        0, -- unidades x caja
        0.00, -- Valor peso x Unidad
        0.00 -- Valor peso x Caja
    FROM
        inserted;
END;



--inserto un nuevo registro con el idproducto creado
-- Crear un trigger AFTER INSERT
--drop trigger trgAfterInsertProductos
CREATE TRIGGER InsertProductosPreciosV
ON Productos
AFTER INSERT
AS
BEGIN
    -- Insertar un nuevo registro en la tabla PreciosV con los valores predeterminados
    INSERT INTO PreciosV (idProducto, cUnitario, mayorista, cliente, transeunte)
    SELECT idProducto, inserted.cUnitario, 0.0, 0.0, 0.0 -- Puedes ajustar el valor del idUsuario según tu lógica
    FROM inserted;
END;

select * from preciosV
select * from Productos





--disminuyo la cantidad vendida en stocksucursal
--drop trigger TR_DescuentoStockSucursal

CREATE TRIGGER TR_DescuentoStockSucursal
ON DetalleVentas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idSucursal UNIQUEIDENTIFIER;
    DECLARE @idProducto UNIQUEIDENTIFIER;
    DECLARE @cantidad DECIMAL(18, 3);

    -- Obtener datos de la venta recién insertada
    SELECT
        @idSucursal = i.idSucursal,
        @idProducto = i.idProducto,
        @cantidad = i.cantidad
    FROM
        inserted i;

    -- Actualizar el StockSucursal restando la cantidad vendida
    UPDATE StockSucursal
    SET Cantidad = Cantidad - @cantidad
    WHERE
        idSucursal = @idSucursal
        AND idProducto = @idProducto;
END;


select * from Sucursal
select * from StockSucursal
select * from detalleventas

go
--sumar stock enla sucursal por la compra
--drop trigger TR_SumarStockSucursal
CREATE TRIGGER TR_SumarStockSucursal
ON DetalleCompras
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idSucursal UNIQUEIDENTIFIER;
    DECLARE @idProducto UNIQUEIDENTIFIER;
    DECLARE @cantidad DECIMAL(18, 3);

    -- Obtener datos de la compra recién insertada
    SELECT
        @idSucursal = i.idSucursal,
        @idProducto = i.idProducto,
        @cantidad = i.cantidad
    FROM
        inserted i;

    -- Actualizar el StockSucursal restando la cantidad vendida
    UPDATE StockSucursal
    SET Cantidad = Cantidad + @cantidad
    WHERE
        idSucursal = @idSucursal
        AND idProducto = @idProducto;
END;


select * from Sucursal
select * from StockSucursal
select * from DetalleCompras

go
--------------------------------------------------------------------------
--aumentar el numero de comprobante cada vez que se haga una venta

CREATE TRIGGER TR_SumarNumeroComprobante
ON Ventas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idEmpresa UNIQUEIDENTIFIER;
    DECLARE @idComprobante int;

    -- Obtener datos de la venta recién insertada
    SELECT
        @idEmpresa = i.idEmpresa,
        @idComprobante = i.idComprobante
    FROM
        inserted i;

    -- Actualizar la suma del número de comprobante en la tabla Comprobantes
    UPDATE Comprobantes
    SET numero = numero + 1
    WHERE
        idEmpresa = @idEmpresa and idComprobante = @idComprobante;
END;

select * from Comprobantes

go
---go-------------------------------------------------------------------------

----------------------------------------------------
--drop trigger TR_ActualizarCajaDespuesDeVentas
--sumar caja con cada venta
CREATE TRIGGER TR_ActualizarCajaDespuesDeVentas
ON Ventas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idEmpresa UNIQUEIDENTIFIER;
    DECLARE @fecha date;
    DECLARE @totalVenta decimal(18, 2);

    -- Obtener datos de la venta recién insertada
    SELECT
        @idEmpresa = i.idEmpresa,
        @fecha = i.fEmision,
        @totalVenta = i.total
    FROM
        inserted i;

    -- Actualizar la tabla Caja sumando el total de la venta
    UPDATE Caja
    SET
        total = total + @totalVenta
    WHERE
        idEmpresa = @idEmpresa
        AND fecha = @fecha;
END;

go

select * from StockSucursal
select * from DetalleCompras


go
---------------------------------------------
CREATE TRIGGER DespuesDeEliminarDetalleCompra
ON DetalleCompras
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IdCompra UNIQUEIDENTIFIER, @IdProducto UNIQUEIDENTIFIER, @CantidadEliminada DECIMAL, @IdEmpresa UNIQUEIDENTIFIER;

    -- Obtén los valores afectados por la operación de eliminación
    SELECT @IdCompra = IdCompra, @IdProducto = IdProducto, @CantidadEliminada = Cantidad, @IdEmpresa=idEmpresa
    FROM DELETED;

    -- Actualiza el stock en el inventario
    UPDATE StockSucursal
    SET cantidad = cantidad - @CantidadEliminada
    WHERE idProducto = @IdProducto and idEmpresa = @IdEmpresa;
END;

go

CREATE TRIGGER DespuesDeModificarDetalleCompra
ON DetalleCompras
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IdCompra UNIQUEIDENTIFIER, @IdProducto UNIQUEIDENTIFIER, @CantidadAntigua DECIMAL, @CantidadNueva DECIMAL, @IdEmpresa UNIQUEIDENTIFIER;

    -- Obtén los valores afectados por la operación de actualización
    SELECT @IdCompra = IdCompra, @IdProducto = IdProducto, @CantidadAntigua = Cantidad FROM DELETED;
    SELECT @CantidadNueva = Cantidad FROM INSERTED;

    -- Calcula la diferencia en la cantidad
    DECLARE @DiferenciaCantidad INT = @CantidadNueva - @CantidadAntigua;

    -- Actualiza el stock en el inventario
    UPDATE StockSucursal
    SET cantidad = cantidad + @DiferenciaCantidad
    WHERE IdProducto = @IdProducto;
END;
