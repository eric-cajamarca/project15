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