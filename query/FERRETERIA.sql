Create database  DCIvan
go

use  DCIvan

--CREAMOS TABLAS
-----primero a los empleados y usuarios y sus permisos
--drop table Empleado


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



--drop table CuentasxPagar

create table CuentasxPagar
(
Letra varchar(13) primary key,
Proveedor varchar(11),
comprobante varchar(13),
Femision varchar(10),
FVencimiento varchar(10),
Total decimal(18,2),
Plazo varchar(20),
Periodicidad varchar(20),
Cuota decimal(18,2),
CPagadas varchar(2),
Saldo decimal(18,2),
CtaBanco varchar(50),
Estado varchar(50),
)
go



--go
--select * from CuentasxPagar
--select * from HistorialCXP
--go

----drop table HistorialCXP
create table HistorialCXP
(
Fecha varchar(10),
LetraLxP varchar(13),
Proveedor varchar(200),
CompVenta varchar(13),
Nro_Cuota int,
Nro_Docpago varchar(13),
Responsable varchar(200),
Total decimal(18,2),
)

go


--drop table CuentasxCobrar
create table CuentasxCobrar
(
Letra varchar(13) primary key,
Cliente varchar(11),
Comprobante varchar(13),
Femision varchar(10),
FVencimiento varchar(10),
Total decimal(18,2),
Plazo int,
Periodo varchar(20),
Cuota decimal(18,2),
Cpagadas int,
Saldo decimal(18,2),
--CtaBanco varchar(50),
Estado varchar(50),
Empresa int,
)

go

--select * from CuentasxCobrar

-------------------------------------------
--DETALLE DE CUOTAS DE LAS CTAS AL CREDITO
--------------------------------------------
create table DetalleCuotas
(
Comprobante varchar(13),
NroCuota int,
Monto decimal(18,2),
FVencimiento varchar(10),
Moneda varchar(20),
)

--select * from DetalleCuotas



go
--drop table HistorialCXC
create table HistorialCXC
(
Fecha varchar(10),
LetraxC varchar(13),
Cliente varchar(200),
CompVenta varchar(13),
NroCuota int,
NroDocPago varchar(13),
Responsable varchar(200),
Total decimal(18,2),
CIMoratorios decimal(18,2),
)
go
select * from HistorialCXC



create table CuotasCredito
(
Cliente varchar(11),
CompVenta varchar(13),
NroCuota int,
Cuota decimal(18,4),
Moneda varchar(3),
FVencimiento varchar(10),
)
go
select * from CuotasCredito
--select * from CuentasxCobrar
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
create table ProvicionalTienda01
(
Comprobante varchar(20),
Fecha varchar(10),
Ruc varchar(11),
Cliente char(200) ,
Cantidad decimal(18,3),
Codigo varchar(50),
Descripcion varchar(200),
Presentacion varchar(20),
PVenta decimal(18,5),
Total decimal(18,2),

)

--select * from ProvicionalTienda01
go


create table NoFacturadoTienda01
(
Comprobante varchar(20),
Fecha varchar(10),
Ruc varchar(11),
Cliente char(200) ,
Cantidad decimal(18,3),
Codigo varchar(50),
Descripcion varchar(200),
Presentacion varchar(20),
PVenta decimal(18,5),
Total decimal(18,2),

)

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

create table TipoCambio
(
Codigo int identity primary key,
Descripcion varchar(200),
Costo decimal(18,3),
Simbolo varchar(3)

)
--go
--insert into TipoCambio values ('SOLES',1,'S/')
--insert into TipoCambio values ('DOLARES AMERICANOS',3.688,'US$')
--insert into TipoCambio values ('EUROS',3.688,'€')
--SELECT * FROM TipoCambio
--go




create table Periodos
(
Nombre int identity(1,1) primary key,
Descripcion varchar(20),
)
go

--insert into Periodos values ('Dias')
--insert into Periodos values ('Semanas')
--insert into Periodos values ('Quincenal')
--insert into Periodos values ('Meses')
--insert into Periodos values ('Años')
--go
--select * from Periodos

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



--drop table ModoImpresion
create table ModoImpresion
(
id int,
Descripcion varchar(20),
Estado varchar(5)

)
--select * from ModoImpresion
go
--insert into  ModoImpresion values(1,'Tamaño Ticket','False')
--insert into  ModoImpresion values(2,'Tamaño A4','True')

--drop table ImpresorasDisponibles
--truncate table ImpresorasDisponibles
create table ImpresorasDisponibles
(
id int identity(1,1) primary key,
Descripcion varchar(200),
Predeterminado varchar(5)
)

--select * from ImpresorasDisponibles

--insert into  ImpresorasDisponibles values('epson t22','SI')
--insert into  ImpresorasDisponibles values('BROTHER 120','NO')

--DROP TABLE Mostrarpdfs
create table Mostrarpdfs
(
id int identity(1,1) primary key,
Codigo char(2),
Descripcion varchar(50),
Mostrar char(2),
Imprimir char(2)
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