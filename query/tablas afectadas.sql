select * from Comp_Ventas
select * from DetalleVentas where CompVentas='np01-00000011'
select * from PanelDetalleXEnviar
select * from HistorialPedidos 
select * from ComprobantesTienda01
select * from usuarioWeb
select * from ProgramacionPedidos
select * from EstadosPedidos


--truncate table historialpedidos
select * from Usuarios

--modifico la tabla programacion pedidos
ALTER TABLE ProgramacionPedidos ADD idEstado int;
--alterar el tipo de dato de la columna
--ALTER TABLE ProgramacionPedidos
--ALTER COLUMN Estado int;
--cambiar el nombre de una columna
EXEC sp_rename 'ProgramacionPedidos.Estado', 'idEstado', 'COLUMN';

--query para traer una tabla recionada
SELECT * FROM ProgramacionPedidos INNER JOIN EstadosPedidos ON ProgramacionPedidos.idEstado = EstadosPedidos.idEstado


--modifico en la tabla programacionpedidos
EXEC sp_rename 'ProgramacionPedidos.CompVentas', 'idCompVentas', 'COLUMN';

SELECT * FROM ProgramacionPedidos
SELECT * FROM ProgramacionPedidos INNER JOIN EstadosPedidos ON ProgramacionPedidos.idEstado = EstadosPedidos.idEstado

SELECT * FROM UsuarioWeb INNER JOIN Rol ON UsuarioWeb.idRol = Rol.idRol