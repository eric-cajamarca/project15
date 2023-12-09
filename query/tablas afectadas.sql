select * from Comp_Ventas
select * from DetalleVentas where CompVentas='np01-00000011'
select * from PanelDetalleXEnviar
select * from HistorialPedidos 
select * from ComprobantesTienda01
select * from usuarioWeb
select * from ProgramacionPedidos


--truncate table historialpedidos
select * from Usuarios

--modifico la tabla programacion pedidos
ALTER TABLE ProgramacionPedidos ADD Estado bit;
--alterar el tipo de dato de la columna
ALTER TABLE ProgramacionPedidos
ALTER COLUMN Estado int;

