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

----------------------------------------------------------------------------

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



select * from caja
select * from ventas
