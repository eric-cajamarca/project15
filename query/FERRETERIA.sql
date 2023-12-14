
--truncate table IngresoUsuarios
create table IngresoUsuarios
(
Usuario varchar(10),
Fecha varchar(10),
Ingreso varchar(20),
)
go
------------------------------------------------------------------------------


create table HistorialProductos
(
Fecha date,
Codigo varchar(50),
Descripcion varchar(100), 
Usuario varchar(20)
)

go


----go 
--DROP table Historial_ProdVendidos
create table Historial_ProdVendidos
(
Codigo varchar(50),
Descripcion varchar(200),
Cantidad decimal(18,3),
Presentacion varchar(20),
PVenta decimal(18,5),
Hora varchar(10),
FIngre date,
FVenta date,
Utilidad decimal(18,2),

)



go
--select * from Comp_VentasTienda01
--select * from DetalleVentas
--select * from Historial_ProdVendidos
--select * from Historial_ProdComprados



--==============================================
--TABLAS PROVICIONALES PARA VENTAS
--==============================================
--drop table ProvicionalTienda01




--drop table ProgramacionPedidos
create table ProgramacionPedidos
(
CompVentas varchar(13),
FVenta varchar(10),
FEnvio varchar(10),
Ruc varchar(11),
RSocial varchar(200),
Direccion varchar(200),
Distrito varchar(50),
Referencia varchar(200),
Celular varchar(50),
Observaciones varchar(200),
PagoXflete decimal(18,2),
Destino varchar(20)
)

--select * from ProgramacionPedidos
--select * from HistorialPedidos
--select * from comp_Ventas
--select * from clientes_Ruc
--select * from observaciondenvios

--drop table HistorialPedidos
create table HistorialPedidos
(
CompEnvio varchar(13),
CompVentas varchar(13),
FEnvio varchar(10),
Descripcion varchar(200),
Presentacion varchar(20),
Cantidad decimal(18,3),
)

go




-----------------------------
-----------------------------
--drop table CtasdeBanco
create table CtasdeBanco
(
idCbanco int identity (1,1),
NumeroCta varchar(20) primary key,
CCI varchar(20),
Moneda varchar(20),
TipoCuenta varchar(20),
Banco varchar(50),
Propietario varchar(200),
Rsocial varchar(200)

)

go
--drop table CtasdeBanco
--select * from CtasdeBanco


--drop table TipoCambio





--drop table Prestamos
create table Prestamos
(
NroPrestamos varchar(50) primary key,
Deudor varchar(50),
EntFinanciera varchar(50),
Fecha varchar(10),
Banca varchar(50),
Producto varchar(50),
Importe decimal(18,4),
Moneda varchar(20),
NCuotas int,
Periodos varchar(10),
TEA decimal(18,6),
TCEA decimal(18,6),
PGracia int,
VCuota decimal(18,2),
PFPago varchar(10),
TCapital decimal(18,2),
TInteres decimal(18,2),
TCapInt decimal(18,2),
Estado varchar(10),
CuotaPagada varchar(4)
)

--select * from Prestamos


--drop table Seguros
create table Seguros
(
NroPrestamos varchar(50) primary key,
Producto varchar(50),
FInicio varchar(10),
FVenc varchar(10),
Tasa decimal(18,6),
MontoPrima decimal(18,6),
Moneda varchar(20),
)

go

--select * from Prestamos
----select * from Seguros
--select * from HistorialPrestamos
go

--drop table HistorialPrestamos
create table HistorialPrestamos
(
Fecha date,
NroPrestamos varchar(50),
Agencia varchar(50),
CuotaPagada int,
Capital decimal(18,6),
Interes decimal(18,6),
PgoTotal decimal(18,6),
NRecibo varchar(50),
Hora varchar(10),
FVencimiento varchar(10),
PMoratorios decimal(18,2)
)
go

--select * from HistorialPrestamos
--select * from busPrestamos

-----------------------------------------------
--===============================================
--COMPROBANTES DE PAGO 
--COMUNICACION DE BAJA
--===============================================
--drop table cBajas
CREATE table CBajasTienda01
(
CompVenta varchar(13)  primary key,
FGeneracion varchar(10),
FComunicacon varchar(10),
TipoDocBaja varchar(2),
NumDocBaja varchar(13),
DesMotivo varchar(100),
NumTicket varchar(50),
EstadoSunat varchar(50),
)





SELECT * FROM Categoria

--select * from Mostrarpdfs

--insert into Mostrarpdfs values	('01','Factura','NO','NO')
--insert into Mostrarpdfs values	('03','Boleta','NO','NO')
--insert into Mostrarpdfs values	('07','Nota de crédito','NO','NO')
--insert into Mostrarpdfs values	('08','Nota de dédito','NO','NO')
--insert into Mostrarpdfs values	('10','Guía Remitente','NO','NO')
--insert into Mostrarpdfs values	('11','Guía Transportista','NO','NO')
--insert into Mostrarpdfs values	('LT','Letra por cobrar','NO','NO')
--insert into Mostrarpdfs values	('TK','Ticket de despacho','NO','NO')
--insert into Mostrarpdfs values	('NP','Nota de pedido','SI','NO')
--insert into Mostrarpdfs values	('CT','Cotización','NO','NO')
--insert into Mostrarpdfs values	('NE','Nota de envio','NO','NO')
--insert into Mostrarpdfs values	('RP','Recibo de pago','NO','NO')

--drop table UtilidadTotal
create table UtilidadTotal
(
id int identity(1,1) primary key,
Comprobante char(13),
FVenta char(10),
Codigo char(20),
Descripcion varchar(200),
CUnitario decimal(18,2),
Cantidad decimal(18,2),
PVenta decimal(18,2),
Total decimal(18,2),
Utilidad decimal(18,2),
Usuario char(20),
Destino char(20),
FIngreso char(10),
idComp char(2)
)

SELECT * FROM UtilidadTotal
SELECT * FROM UtilidadXProducto
select * from ProductosCat