create database multiempresa

use multiempresa

--drop table Empresas
CREATE TABLE Empresas(
	idEmpresa int IDENTITY(1,1) primary key NOT NULL,
	ruc varchar(11) NULL,
	razon_Social varchar(200) NULL,
	rubro varchar(200) NULL,
	direccion varchar(200) NULL,
	distrito varchar(50) NULL,
	region varchar(50) NULL,
	provincia varchar(50) NULL,
	celular varchar(11) NULL,
	Whatsapp varchar(11) NULL,
	Correo varchar(100) NULL,
	Logo varbinary(max) NULL,
	Alias varchar(29) NULL,
)

--truncate table Empleado
create table Empleados
(
	IdEmpleado int identity (1,1) primary key not null,
	idEmpresa int not null,
	idDocumento int not null,
	dni varchar(8) ,
	nombres varchar (50),
	apellidos varchar(100),
	celular varchar (11),
	direccion varchar(200),
	puesto varchar (50),
	fIngreso varchar (10),
	fNacimiento varchar (10),
	foto varbinary(max),
	idUsuario int not null,
	FOREIGN KEY (idEmpresa) REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	FOREIGN KEY (idDocumento) REFERENCES Documentos(idDocumento) ON DELETE CASCADE,
	FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
)
go
--truncate table usuarios
CREATE TABLE Usuarios
(
	idUsuario int identity (1,1) primary key  NOT NULL,
	idEmpresa int not null,
	nombres varchar(50) NOT NULL,
	apellidos varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password text NOT NULL,
	rol varchar(50) NOT NULL,
	estado bit NOT NULL,
	fregistro date NOT NULL,
	FOREIGN KEY (idEmpresa) REFERENCES Empresas(idEmpresa),
 )
GO

--select * from usuarios
go

create table Rol
(
idRol int identity (1,1) primary key not null,
idEmpresa int not null,
descripcion varchar(50) not null,
FOREIGN KEY (idEmpresa) REFERENCES Empresas(idEmpresa),
)

go

create table Permisos
(
idPermisos int identity(1,1) primary key not null,
idEmpresa int not null,
nombres varchar(50)not null,
descripcion varchar(200) not null,
)

go

create table Documentos
(
idDocumento int primary key not null,
nombre varchar(20) not null,
descripcion varchar(200) not null,

)
select * from Documentos
go

insert into Documentos values ('1','DNI','Documento Nacional de Identidad')
insert into Documentos values ('6','RUC','Registro Unico de Contributentes')
insert into Documentos values ('4','CARNET','Carnet de extrangería')
insert into Documentos values ('A','CEDULA','Cédula diplomática de identidad')

go

create table Clientes
(
idCliente int identity (1,1) primary key not null ,
idEmpresa int not null,
ruc varchar(11) not null,
idDocumento int not null,
rSocial varchar(200) not null,
direccion varchar(200) not null,
referencia text null,
distrito varchar(50) null,
ubigeo varchar(12) null,
celular varchar (50) null,
correo varchar(100) null,
condicion varchar(50) null,
)
go

create table Proveedors
(
idProveedor int identity(1,1) primary key not null,
idEmpresa int not null,
idDocumento int not null,
ruc varchar (11) not null,
rSocial varchar (200) not null,
direccion varchar(200) null,
distrito varchar (50) null,
ubigeo varchar(12) null,
celular varchar (50) null,
correo varchar(100) null,
condicion varchar(50) null,
)
go

create table Presentacion
(
idPresentacion int identity(1,1) primary key not null,
idEmpresa int not null,
Descripcion varchar(50) not null,
Multiplicador int null,

)
go

select * from Presentacion

--INSERT INTO Presentacion VALUES ('BG','Bolsa',1)
--INSERT INTO Presentacion VALUES ('CEN','Ciento',100)
--INSERT INTO Presentacion VALUES ('MIL','Millar',1000)
--INSERT INTO Presentacion VALUES ('BX','Caja',1)
--INSERT INTO Presentacion VALUES ('RO','Rollo',1)
--INSERT INTO Presentacion VALUES ('WG','Galón',1)
--INSERT INTO Presentacion VALUES ('MTR','Metros',1)
--INSERT INTO Presentacion VALUES ('KGM','Kilogramo',1)
--INSERT INTO Presentacion VALUES ('LTR','Litro',1)
--INSERT INTO Presentacion VALUES ('NIU','Unidad',1)
--INSERT INTO Presentacion VALUES ('DZN','Docena',12)
--INSERT INTO Presentacion VALUES ('TNE','Tonelada',1)
--INSERT INTO Presentacion VALUES ('PK','Paquete',1)
--INSERT INTO Presentacion VALUES ('SA','Saco',1)
--INSERT INTO Presentacion VALUES ('BO','Botella',1)
--INSERT INTO Presentacion VALUES ('ZZ','Otros',1)


--drop table Categoria
create table Categoria 
(
idCategoria int identity (1,1) primary key not null,
Descripcion varchar(200)not null,
idEmpresa int null


)
go
--INSERT INTO Categoria VALUES ('Abrazadera')
--INSERT INTO Categoria VALUES ('Aceite')



--TRUNCATE TABLE CORRELATIVO
create table Correlativo
(
idCorrelativo int identity (1,1) primary key not null,
idEmpresa int not null,
numero int not null,

)

--insert into Correlativo values(1,100000)
--insert into Correlativo values(2,200000)


--truncate table Productos
--go 
--drop table Productos
create table Productos   
(
idProducto int identity(1,1) primary key not null,
Codigo varchar(20) not null,
idCategoria varchar(50) not null,
descripcion varchar(200) not null,
idPresentacion varchar(20) not null,
cUnitario decimal(18,5) not null,
cantidad decimal(18,2) not null, --agrego la cantidad
fProduccion varchar(10) null,
fVencimiento varchar(10) null,
idEmpresa int not null,
alertaMinimo varchar(5)null,
alertaMaximo varchar(5) null,
VecesVendidas int null,
facturar varchar(2) null,
idUsuario int not null,
FIngreso varchar(10) not null,
)

go


create table PreciosV
(
idPreciosV int identity (1,1) not null,
idEmpresa int not null,
idProducto varchar(20) not null,
Mayorista decimal(18,4) null,
Cliente decimal(18,4) null,
Transeunte decimal(18,4) null,

)
go

create table HistorialProductos
(
idHistorialP int identity(1,1) primary key not null,
idEmpresa int not null,
Fecha date not null,
idProducto int not null,
descripcion varchar(100), 
idUsuario int not null
)

go

----------------------------------
--TIENDAS Y EXISTENCIAS
----------------------------------
--drop table tiendas
create table Sucursal
(
idSucursal int identity (1,1) primary key not null,
idEmpresa int not null,
nombre varchar(20) not null,
direccion varchar(200) null,
inventario decimal(18,4) null,
)

go

create table stockSucursal
(
idStockSucursal int identity(1,1) primary key not null,
idSucursal int not null,
idProducto int not null,
idCategoria int not null,
cantidad decimal(18,2) not null,
ubicacion Varchar(20) null,
fIngreso date null,
idUsuario int,
)

--DROP TABLE ORDENESALIDA
create table OrdenSalida
(
idOrdenSalida int identity(1,1) primary key not null,
idEmpresa int not null,
fechaSalida date not null,
responsable varchar(200) null,
idProducto int not null,
cantidad decimal(18,3) null,
idUsuario int not null,
)


--TRUNCATE TABLE ComprobantesTienda02
create table Comprobantes
(
idComprobante int identity (1,1) primary key not null,
idEmpresa int not null,
codigo varchar(2) not null,
nombre varchar(50) not null,
serie varchar(4) not null,
numero varchar(8) not null,
)
go

--insert into Comprobantes values	('01','Factura','F001','1')
--insert into Comprobantes values	('03','Boleta','B001','1')
--insert into Comprobantes values	('07','Nota de crédito','BC01','1')
--insert into Comprobantes values	('07','Nota de crédito','FC01','1')
--insert into Comprobantes values	('08','Nota de dédito','BD01','1')
--insert into Comprobantes values	('08','Nota de dédito','FD01','1')
--insert into Comprobantes values	('RA','Comunicación de baja','-','1')
--insert into Comprobantes values	('RC','Resumen diario','-','1')
--insert into Comprobantes values	('10','Guía Remitente','TG01','1')
--insert into Comprobantes values	('11','Guía Transportista','RG01','1')
--insert into Comprobantes values	('LT','Letra por cobrar','LT','1')
--insert into Comprobantes values	('TK','Ticket de despacho','TK01','1')
--insert into Comprobantes values	('NP','Nota de pedido','NP01','1')
--insert into Comprobantes values	('CT','Cotización','CT01','1')
--insert into Comprobantes values	('NE','Nota de envio','NE01','1')
--insert into Comprobantes values	('RP','Recibo de pago','RP01','1')


--------------------------------.
--COMPRAS
---------------------------------

create table Compras
(
idcompra int identity (1,1) primary key not null,
idEmpresa int not null,
compCompra char(13) not null,
idComprobante int not null,
serie varchar(4) not null,
numero varchar (8) not null,
fEmision varchar (10) not null,
fVencimiento varchar(10) null,
idProveedor int not null,
idMoneda int not null,
condicionPago varchar (20),
subTotal decimal(18,2),
igv decimal(18,2),
exonerado decimal(18,2),
gratuito decimal(18,2),
otrosCargos decimal(18,2),
descuentos decimal(18,2),
total decimal(18,2),
idMediosPago int not null, --el estado determinara pendiente o pagado
compRelacionado varchar(50),
idUsuario int not null,
)

go

create table MediosPago
(
	idMediospago varchar(3) primary key not null,
	descripcion varchar(50) not null

)
go
--insert into MediosPago values	('001','DEPÓSITO EN CUENTA');
--insert into MediosPago values	('003','TRANSFERENCIA DE FONDOS');
--insert into MediosPago values	('005','TARJETA DÉBITO');
--insert into MediosPago values	('006','TARJETA CRÉDITO');
--insert into MediosPago values	('009','CONTADO');
--insert into MediosPago values	('009','CRÉDITO');

CREATE TABLE Moneda(
	idMoneda int identity(1,1) primary key not null,
	codigoc varchar(3) NOT NULL,
	descripcion varchar(20) not NULL,
	simbolo varchar(3) not NULL,

)

select * from moneda

create table EstadoPago
(
	idEstadoPago int identity(1,1) primary key not null,
	descripcion varchar(20) not null,
)
go

--insert into EstadoPago values	('Pendiente');
--insert into EstadoPago values	('Pagado');



create table EstadosPedidos(
idEstadoPEdido int identity(1,1) primary key,
idEmpresa int not null,
descripcion varchar(50) not null
)
select * from EstadosPedidos
go

--insert into EstadosPedidos values	('Sin Programar');
--insert into EstadosPedidos values	('Programado');
--insert into EstadosPedidos values	('Enviado');
--insert into EstadosPedidos values	('Entregado');



--drop table DetalleCompras

create table DetalleCompras
(
idDetalleCompra int identity(1,1) primary key not null,
idEmpresa int not null,
idCompra int not null,
idProducto int not null,
idCategoria int not null,
idSucursal int not null,
Cantidad decimal(18,3) not null,
--Codigo varchar(50),
--Categoria varchar(50),
--Descripcion varchar(200),
--Presentacion varchar(20),
P_Unitario decimal(18,5),
Total decimal(18,2),
)

--SELECT * FROM DetalleCompras
go

create table BorradorCompras
(
idBorradorCompras int identity(1,1) not null,
idEmpresa int not null,
Cantidad decimal(18,3) null,
Codigo varchar(50) null,
Categoria varchar(50) null,
Descripcion varchar(200) null,
Presentacion varchar(20) null,
CUnitario decimal(18,5) null,
FProduccion varchar(10) null,
FVencimiento varchar(10) null,
Ubicacion varchar(20) null,
Total decimal(18,2) null,
Serie_Numero char(13) null,
Razon_Social varchar(200) null
)
SELECT * FROM BorradorCompras
go



------------------------------------
--VENTAS
------------------------------------
CREATE TABLE Ventas
(
	idVentas int identity(1,1) primary key not null,
	idEmpresa int not null,
	compVenta varchar(13) NOT NULL,
	idComprobante int not NULL,
	serie varchar(4) not NULL,
	numero varchar(8) not NULL,
	fEmision varchar(10) not NULL,
	fVencimiento varchar(10) not NULL,
	idDocumento int not NULL,
	idCliente int NULL,
	idMoneda int NULL,
	idMediosPago int not NULL, --contado, deposito...
	subTotal decimal(18, 2) NULL,
	igv decimal(18, 2) NULL,
	exonerado decimal(18, 2) NULL,
	gratuito decimal(18, 2) NULL,
	icbper decimal(18, 2) NULL,
	otrosCargos decimal(18, 2) NULL,
	descuentos decimal(18, 2) NULL,
	total decimal(18, 2) NULL,
	idEstadoPago int not NULL, --pagado o pendiente
	idEstadoPedido int not NULL,
	idEstadoSunat int not NULL,
	idCompRel int not NULL,
	idUsuario int not NULL,
)

select * from ventas


CREATE TABLE DetalleVentas(
	idDetalleVenta int identity(1,1) primary key NOT NULL,
	idVenta int not NULL,
	cantidad decimal(18, 3) not NULL,
	idProducto int not null,
	--[Descripcion] [varchar](200) NULL,
	idPresentacion int not NULL,
	pVenta decimal(18, 5) not NULL,
	descuentos decimal(18, 2) NULL,
	igv decimal(18, 2) NULL,
	ISC decimal(18, 2) NULL,
	total decimal(18, 2) NULL,
	cantEntregado decimal(18, 2) NULL,
	hVenta varchar(10) NULL,
)


CREATE TABLE BorradorVenta(
	idBorradorVenta int identity(1,1) primary key not null,
	idEmpresa int not null,
	cantidad decimal(18, 3) NULL,
	codigo varchar(50) NULL,
	descripcion varchar(200) NULL,
	presentacion varchar(3) NULL,
	pVenta decimal(18, 5) NULL,
	total decimal(18, 2) NULL,
	alias varchar(50) NULL
)

GO

CREATE TABLE Caja(
	idCaja int identity(1,1) primary key not null,
	idEmpresa int not null,
	fecha date NOT NULL,
	estadoAC varchar(20) NULL,
	horaAC varchar(20) NULL,
	usuarioAC varchar(20) NULL,
	efectivoAC decimal(18, 2) NULL,
	estadoCC varchar(20) NULL,
	horaCC varchar(20) NULL,
	usuarioCC varchar(20) NULL,
	efectivoCC decimal(18, 2) NULL,
	transferencia decimal(18, 2) NULL,
	tarjeta decimal(18, 2) NULL,
	credito decimal(18, 2) NULL,
	FOREIGN KEY (idEmpresa) REFERENCES Empresas(idEmpresa),
);

-------------------------------------
--SUNAT
-------------------------------------


create table Tributos
(
	idTributo int primary key not null,
	descripcion varchar(50) not null,
	codigo varchar(3) not null
)

--insert into Tributos values	('1000','IGV Impuesto General a las Ventas','VAT');
--insert into Tributos values	('1016','Impuesto a la Venta Arroz Pilado','VAT');
--insert into Tributos values	('2000','ISC Impuesto Selectivo al Consumo','EXC');
--insert into Tributos values	('7152','Impuesto a la bolsa plastica','OTH');
--insert into Tributos values	('9995','Exportación','FRE');
--insert into Tributos values	('9996','Gratuito','FRE');
--insert into Tributos values	('9997','Exonerado','VAT');
--insert into Tributos values	('9998','Inafecto','FRE');
--insert into Tributos values	('9999','Otros tributos','OTH');

create table EstadoSunat
(
	idEstadoSunat int identity(1,1) primary key not null,
	codigo varchar(3) not null,
	descripcion varchar(30) not null,
)
go


create table ComprobanteRelacionado
(
	idCompRel int identity(1,1) primary key not null,
	descripcion varchar(50) not null,
)

