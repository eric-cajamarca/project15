
--la compra se realiza con estos dos comprobantes
select top 10 * from Comp_Ventas --resume el total de la compra
select top 10 * from DetalleVentas --detalle de la compra

--si el estado pedido es por entregar

select top 10 * from ProgramacionPedidos --aqui se realiza la progracion de pedidos

select top 10 * from HistorialPedidos --aqui se registra los envios al cliente

--se recomienda realizar asignaciones de pedidos a los vehiculos
create table asignaciones(
	CompVentas char(13),
	Ruc char(11),  --de programacion de pedidos
	RSocial varchar(200), --tambien de programacion de pedidos




)