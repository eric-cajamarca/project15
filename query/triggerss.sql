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
--drop TRIGGER CrearRolesPredeterminados
CREATE TRIGGER CrearRolesPredeterminados
ON Empresas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @idEmpresa UNIQUEIDENTIFIER;

    -- Obtener el idEmpresa
    SELECT @idEmpresa = idEmpresa FROM inserted;

    -- Insertar registros en la tabla Comprobantes
    INSERT INTO Rol(idRol, idEmpresa, descripcion)
    VALUES 
        (NEWID(), @idEmpresa, 'Vendedor'),
		(NEWID(), @idEmpresa, 'Almacenero'),
		(NEWID(), @idEmpresa, 'Chofer'),
		(NEWID(), @idEmpresa, 'Despacho')

        
	END
GO
select * from rol

--crear correlativo cada vez que se agregue una nueva empresa
--drop trigger TR_CrearCorrelativo
CREATE TRIGGER TR_CrearCorrelativo
ON Empresas
AFTER INSERT
AS
BEGIN
    DECLARE @idEmpresa UNIQUEIDENTIFIER;
    declare @numero int;

    -- Obtener el idEmpresa y el n�mero deseado para el nuevo registro de Correlativos
    SELECT @idEmpresa = idEmpresa FROM inserted;
	
    -- Insertar el nuevo registro en Correlativos
    INSERT INTO Correlativos (idEmpresa, numero)
    VALUES (@idEmpresa, 10000);
END;

GO
select * from correlativos

--------------------------------------------------------
--trigger para insertar registros en la tabla de comprobantes
--drop TRIGGER trg_after_comprobantes_insert
CREATE TRIGGER trg_after_comprobantes_insert
ON Empresas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @idEmpresa UNIQUEIDENTIFIER;

    -- Obtener el idEmpresa
    SELECT @idEmpresa = idEmpresa FROM inserted;

    -- Insertar registros en la tabla Comprobantes
    INSERT INTO Comprobantes (idEmpresa, codigo, nombre, serie, numero)
    VALUES 
        (@idEmpresa, '01', 'Factura', 'F001', 1),
        (@idEmpresa, '03', 'Boleta', 'B001', 1),
        (@idEmpresa, '07', 'Nota de Credito', 'NC01', 1),
        (@idEmpresa, '08', 'Nota de Debito', 'ND01', 1),
        (@idEmpresa, '08', 'Nota de Debito', 'BD01', 1),
        (@idEmpresa, '08', 'Nota de Debito', 'FD01', 1),
        (@idEmpresa, 'RA', 'Comunicacion de Baja', '-', 1),
        (@idEmpresa, 'RC', 'Resumen Diario', '-', 1),
        (@idEmpresa, '10', 'Guia Remitente', 'TG01', 1),
        (@idEmpresa, '11', 'Guia Transportista', 'RG01', 1),
        (@idEmpresa, 'LT', 'Letra por Cobrar', 'LT', 1),
        (@idEmpresa, 'TK', 'Ticket de Despacho', 'TK01', 1),
        (@idEmpresa, 'NP', 'Nota de Pedido', 'NP01', 1),
        (@idEmpresa, 'CT', 'Cotizacion', 'CT01', 1),
        (@idEmpresa, 'NE', 'Nota de Envio', 'NE01', 1),
        (@idEmpresa, 'RP', 'Recibo de Pago', 'RP01', 1);
END
GO

select * from Comprobantes
----------------------------------------------------------------------------------
--trigger para insertar los registros para la tabla de presentaciones
--drop trigger trg_after_empresa_insert
CREATE TRIGGER trg_after_empresa_insert
ON Empresas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @idEmpresa UNIQUEIDENTIFIER;

    -- Obtener el idEmpresa
    SELECT @idEmpresa = idEmpresa FROM inserted;

    -- Insertar registros en la tabla Comprobantes
    INSERT INTO Presentacion (idEmpresa, codigo, Descripcion, Multiplicador)
    VALUES 
		(@idEmpresa,'BG','BOLSA',1),
		(@idEmpresa,'BO','BOTELLA',1),
		(@idEmpresa,'BJ','BALDE',1),
		(@idEmpresa,'CY','CILINDRO',1),
		(@idEmpresa,'CJ','CONO',1),
		(@idEmpresa,'CEN','CIENTO',100),
		(@idEmpresa,'BX','CAJA',1),
		(@idEmpresa,'DZN','DOCENA',12),
		(@idEmpresa,'GRM','GRAMO',1),
		(@idEmpresa,'SET','JUEGO',1),
		(@idEmpresa,'MTR','METRO',1),
		(@idEmpresa,'MTK','METRO CUADRADO',1),
		(@idEmpresa,'MTQ','METRO CUBICO',1),
		(@idEmpresa,'MIL','MILLAR',1000),
		(@idEmpresa,'UM','MILLON DE UNIDADES',1000000),
		(@idEmpresa,'RO','ROLLO',1),
		(@idEmpresa,'ONZ','ONZAS',1),
		(@idEmpresa,'MTR','METROS',1),
		(@idEmpresa,'KGM','KILOGRAMO',1),
		(@idEmpresa,'KTM','KILOMETRO',1),
		(@idEmpresa,'CA','LATAS',1),
		(@idEmpresa,'LTR','LITRO',1),
		(@idEmpresa,'TNE','TONELADA',1),
		(@idEmpresa,'TU','TUBOS',1),
		(@idEmpresa,'PF','PALETAS',1),
		(@idEmpresa,'PK','PAQUETE',1),
		(@idEmpresa,'PR','PAR',1),
		(@idEmpresa,'FOT','PIES',1),
		(@idEmpresa,'FTK','PIES CUADRADOS',1),
		(@idEmpresa,'FTQ','PIES CUBICOS',1),
		(@idEmpresa,'ST','PLIEGO',1),
		(@idEmpresa,'SA','SACO',1),
		(@idEmpresa,'NIU','UNIDAD (BIENES)',1),
		(@idEmpresa,'ZZ','UNIDAD (SERVICIOS)',1),
		(@idEmpresa,'GLL','US GALON (3.7843 L)',1),
		(@idEmpresa,'YRD','YARDA',1);
	
END
GO

select * from presentacion


  --      (@idEmpresa,'BG','Bolsa',1),
		--(@idEmpresa,'BO','Botella',1),
		--(@idEmpresa,'BJ','Balde',1),
		--(@idEmpresa,'CY','Cilindro',1),
		--(@idEmpresa,'CJ','Cono',1),
  --      (@idEmpresa,'CEN','Ciento',100),
		--(@idEmpresa,'BX','Caja',1),
		--(@idEmpresa,'DZN','Docena',12),
		--(@idEmpresa,'GRM','Gramo',1),
		--(@idEmpresa,'SET','Juego',1),
		--(@idEmpresa,'MTR','Metro',1),
		--(@idEmpresa,'MTK','Metro cuadrado',1),
		--(@idEmpresa,'MTQ','Metro cubico',1),
  --      (@idEmpresa,'MIL','Millar',1000),
		--(@idEmpresa,'UM','Millon de unidades',1000000),
  --      (@idEmpresa,'RO','Rollo',1),
		--(@idEmpresa,'ONZ','ONZAS',1),
  --      (@idEmpresa,'MTR','Metros',1),
  --      (@idEmpresa,'KGM','Kilogramo',1),
		--(@idEmpresa,'KTM','Kilometro',1),
		--(@idEmpresa,'CA','Latas',1),
  --      (@idEmpresa,'LTR','Litro',1),
  --      (@idEmpresa,'TNE','Tonelada',1),
		--(@idEmpresa,'TU','Tubos',1),
		--(@idEmpresa,'PF','Paletas',1),
  --      (@idEmpresa,'PK','Paquete',1),
		--(@idEmpresa,'PR','Par',1),
		--(@idEmpresa,'FOT','Pies',1),
		--(@idEmpresa,'FTK','Pies cuadrados',1),
		--(@idEmpresa,'FTQ','Pies cubicos',1),
		--(@idEmpresa,'ST','Pliego',1),
  --      (@idEmpresa,'SA','Saco',1),
		--(@idEmpresa,'NIU','Unidad (bienes)',1),
		--(@idEmpresa,'ZZ','Unidad (servicios)',1),
  --      (@idEmpresa,'GLL','US Galon (3.7843 L)',1),
  --      (@idEmpresa,'YRD','Yarda',1);



--------------------------------------------------------------------------------------
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
    SELECT idProducto, inserted.cUnitario, 0.0, 0.0, 0.0 -- Puedes ajustar el valor del idUsuario seg�n tu l�gica
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

    -- Obtener datos de la venta reci�n insertada
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

    -- Obtener datos de la compra reci�n insertada
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

    -- Obtener datos de la venta reci�n insertada
    SELECT
        @idEmpresa = i.idEmpresa,
        @idComprobante = i.idComprobante
    FROM
        inserted i;

    -- Actualizar la suma del n�mero de comprobante en la tabla Comprobantes
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

    -- Obtener datos de la venta reci�n insertada
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

    -- Obt�n los valores afectados por la operaci�n de eliminaci�n
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

    -- Obt�n los valores afectados por la operaci�n de actualizaci�n
    SELECT @IdCompra = IdCompra, @IdProducto = IdProducto, @CantidadAntigua = Cantidad FROM DELETED;
    SELECT @CantidadNueva = Cantidad FROM INSERTED;

    -- Calcula la diferencia en la cantidad
    DECLARE @DiferenciaCantidad INT = @CantidadNueva - @CantidadAntigua;

    -- Actualiza el stock en el inventario
    UPDATE StockSucursal
    SET cantidad = cantidad + @DiferenciaCantidad
    WHERE IdProducto = @IdProducto;
END;
