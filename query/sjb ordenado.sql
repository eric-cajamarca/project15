create table Documentos
(
idDocumento varchar(1) primary key not null,
nombre varchar(20) not null,
descripcion varchar(200) not null,

)
select * from Documentos
go


insert into Documentos values ('1','DNI','Documento Nacional de Identidad')
insert into Documentos values ('4','CARNET','Carnet de extrangería')
insert into Documentos values ('6','RUC','Registro Unico de Contributentes')
insert into Documentos values ('7','PASAPORTE','Pasaporte')
insert into Documentos values ('A','CEDULA','Cédula diplomática de identidad')
GO



truncate table empresas
CREATE TABLE Empresas(
	idEmpresa UNIQUEIDENTIFIER primary key NOT NULL,
	idDocumento varchar(1) not null,
	ruc varchar(11) not NULL,
	razon_Social varchar(200) not NULL,
	nombreComercial varchar(200) null,
	rubro varchar(200) NULL,
	celular varchar(11) NULL,
	correo varchar(100) not NULL,
	password text not null,
	logo varchar(200) NULL,
	alias varchar(10) NULL,
	condicion varchar(20) null,
	estSunat varchar(20) null,
	estado bit NOT NULL,
	fRegistro datetime not null,



	FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
)
go

--ALTER TABLE Empresas ALTER COLUMN logo VARCHAR(200) NULL;


insert into Empresas values ('42099529-43C9-4B7F-921A-3D6FB946E93E','6','20611688564','EMPRESA FERRETERA AVE FENIX SJB E.I.R.L.','','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','968073361','','$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',CONVERT(varbinary(max),''),'Fenix','HABIDO','ACTIVO',1,GETDATE());
insert into Empresas values ('BA51C992-7D05-459E-B419-A03358C0A788','6','20611658495','GRUPO OLITOR SJB E.I.R.L.','','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','968073361','',CONVERT(varbinary(max),''),'Olitor','Activo','Habido',1);
insert into Empresas values ('5615C329-F8B6-4634-B0EF-C02B9F2315B3','6','10426524541','TORRES NUÑEZ LUCILA','','VENTA AL POR MAYOR Y MENOR DE MATERIALES DE CONSTRUCCIÓN Y ARTÍCULOS DE FERRETERÍA','966818231','lucilatorressjb@gmail.com',CONVERT(varbinary(max),''),'Lucila','Activo','Habido',0);

go 
select * from Empresas
select * from UsuarioWeb
select * from DireccionEmpresa

select * from sucursal
select * from rol

-- Tabla para la dirección (reutilizable varias direcciones para varias empresas)
CREATE TABLE DireccionEmpresa (
    idDireccionEmpresa INT IDENTITY(1,1) PRIMARY KEY not null,
	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
    ubigeo varchar(10) null,
	codPais varchar(10) null,
    region varchar(50) NULL,
	provincia varchar(50) NULL,
	distrito varchar(50) NULL,
	urbanizacion varchar(100) null,
	direccion VARCHAR(255) null,
	codLocal varchar(10) null,
	principal bit

);

go

insert into DireccionEmpresa values ('42099529-43C9-4B7F-921A-3D6FB946E93E', '060801','PEN','CAJAMARCA','JAEN','JAEN','URB. LOS OLIVOS','PJ. LOS OLIVOS NRO. C-02 URB. H.U PALESTINA (FRENTE AL PARQUE LOS OLIVOS)','',1);
insert into DireccionEmpresa values ('BA51C992-7D05-459E-B419-A03358C0A788','060801','PEN','CAJAMARCA','JAEN','JAEN' ,'URB. LOS OLIVOS','PJ. LOS OLIVOS C-1 NRO. SN URB. PALESTINA (1ER PISO)','',1);
insert into DireccionEmpresa values ('5615C329-F8B6-4634-B0EF-C02B9F2315B3','060801','PEN','CAJAMARCA','JAEN','JAEN','URB. LOS OLIVOS','PSJE. LOS OLIVOS S/N URB. LOS OLIVOSPSJE. LOS OLIVOS S/N URB. LOS OLIVOS','',1);


select * from DireccionEmpresa
go

--truncate table rol
create table Rol
(
idRol UNIQUEIDENTIFIER primary key NOT NULL,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
descripcion varchar(50) not null,
)
go
select * from Rol
insert into Rol values
(NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Contador'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Almacen'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Despacho'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Administrador'),
(NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Vendedor');

go

--truncate table usuarioweb
--drop table UsuarioWeb
CREATE TABLE UsuarioWeb
(
	idUsuario UNIQUEIDENTIFIER primary key NOT NULL,
	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	nombres varchar(50) NOT NULL,
	apellidos varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password text NOT NULL,
	idRol UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Rol(idRol) not null, 
	estado bit NOT NULL,
	fregistro datetime NOT NULL,
	
 )
GO
select * from UsuarioWeb
select * from Rol


INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
VALUES
(
    NEWID(),
	'42099529-43C9-4B7F-921A-3D6FB946E93E',
    'Eric',
    'Ortiz Guevara',
	'ericortizguevara@gmail.com',
	'$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',
    '7D06FE44-7297-402F-9350-5E67431AD9CC', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);



go


create table Clientes
(
idCliente int identity (1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idDocumento varchar(1) not null,
ruc varchar(11) not null,
rSocial varchar(200) not null,
correo varchar(100) null,
celular varchar (50) null,
condicion varchar(50) null,
estado bit not null
FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
)
go

CREATE TABLE DireccionClientes (
    idDireccionClientes INT IDENTITY(1,1) PRIMARY KEY not null,
	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa),
	idCliente int not null,
	ubigeo varchar(10) null,
	codPais varchar(10) null,
    region varchar(50) NULL,
	provincia varchar(50) NULL,
	distrito varchar(50) NULL,
	urbanizacion varchar(100) null,
	direccion VARCHAR(255) null,
	referencia varchar(200) null,
	codLocal varchar(10) null,
	principal bit
	
	FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente) ON DELETE CASCADE,
);


create table Presentacion
(
idPresentacion int identity(1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
codigo varchar(3) not null,
Descripcion varchar(50) null,
Multiplicador int null,

)
go

select * from Presentacion


INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','BG','Bolsa',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','CEN','Ciento',100)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','MIL','Millar',1000)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','BX','Caja',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','RO','Rollo',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','WG','Gal�n',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','MTR','Metros',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','KGM','Kilogramo',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','LTR','Litro',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','NIU','Unidad',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','DZN','Docena',12)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','TNE','Tonelada',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','PK','Paquete',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','SA','Saco',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','BO','Botella',1)
INSERT INTO Presentacion VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','ZZ','Otros',1)

go

create table Comprobantes
(
idComprobante int identity (1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
codigo varchar(2) not null,
nombre varchar(50) not null,
serie varchar(4) not null,
numero varchar(8) not null,
)
go


select * from Comprobantes
select * from Empresas
go

insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','01','Factura','F001','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','03','Boleta','B001','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','07','Nota de credito','BC01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','07','Nota de credito','FC01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','08','Nota de dedito','BD01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','08','Nota de dedito','FD01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','RA','Comunicacion de baja','-','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','RC','Resumen diario','-','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','10','Guia Remitente','TG01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','11','Guia Transportista','RG01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','LT','Letra por cobrar','LT','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','TK','Ticket de despacho','TK01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','NP','Nota de pedido','NP01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','CT','Cotizacion','CT01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','NE','Nota de envio','NE01','1')
insert into Comprobantes values	('42099529-43C9-4B7F-921A-3D6FB946E93E','RP','Recibo de pago','RP01','1')
go


--truncate table Categorias
create table Categorias 
(
idCategoria int identity (1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
Descripcion varchar(200)not null,

)
go

INSERT INTO Categorias VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','Electricidad')
INSERT INTO Categorias VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','Carpinteria')
INSERT INTO Categorias VALUES ('42099529-43C9-4B7F-921A-3D6FB946E93E','Pintura')
--INSERT INTO Categoria VALUES ('Aceite')
select * from Categorias

go

--drop table Marcas
create table Marcas
(
idMarca int identity(1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
nombre varchar(50) not null,
descripcion varchar(200) null,
contacto varchar(100) null,
paginaWeb varchar(100) null,
estado bit not null
)

insert into Marcas values('42099529-43C9-4B7F-921A-3D6FB946E93E','TRUPER','HERRAMIENTAS Y ACCESORIOS', 'VENDEDOR ROJER', 'WWW.TRUPER.COM',1)

select * from marcas
select * from empresas
select * from UsuarioWeb
go
--TRUNCATE TABLE CORRELATIVO
create table Correlativos
(
idCorrelativo int identity (1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
numero int not null,
)
go

insert into Correlativos values('42099529-43C9-4B7F-921A-3D6FB946E93E',500000)
insert into Correlativos values('BA51C992-7D05-459E-B419-A03358C0A788',600000)
insert into Correlativos values('5615C329-F8B6-4634-B0EF-C02B9F2315B3',700000)
go
select * from Correlativos

go

--drop table Rol
--truncate table rol
create table Rol
(
idRol UNIQUEIDENTIFIER primary key NOT NULL,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
descripcion varchar(50) not null,
)
go
select * from Rol
insert into Rol values
(NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Contador'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Almacen'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Despacho'),
 (NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Administrador'),
(NEWID(),'42099529-43C9-4B7F-921A-3D6FB946E93E','Vendedor');

go
select * from rol

CREATE TABLE UsuarioWeb
(
	idUsuario UNIQUEIDENTIFIER primary key NOT NULL,
	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	nombres varchar(50) NOT NULL,
	apellidos varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password text NOT NULL,
	idRol UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Rol(idRol) not null, 
	estado bit NOT NULL,
	fregistro datetime NOT NULL,
	
 )
GO
select * from UsuarioWeb
select * from Rol


INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
VALUES
(
    NEWID(),
	'42099529-43C9-4B7F-921A-3D6FB946E93E',
    'Eric',
    'Ortiz Guevara',
	'ericortizguevara@gmail.com',
	'$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',
    '33210C97-A42A-4AA3-AFF9-57F70823CCC9', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);


create table Productos   
(
idProducto UNIQUEIDENTIFIER primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
Codigo varchar(20) not null,
idCategoria int not null,
descripcion varchar(200) not null,
idMarca int null,
idPresentacion int not null,
cUnitario decimal(18,5) not null,
fProduccion varchar(10) null,
fVencimiento varchar(10) null,
alertaMinimo decimal(18,5)null,
alertaMaximo decimal(18,5) null,
VecesVendidas int null,
facturar varchar(2) null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
FIngreso datetime not null,
estado bit not null

FOREIGN KEY (idCategoria) REFERENCES Categorias (idCategoria),
FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
FOREIGN KEY (idMarca) REFERENCES Marcas (idMarca),
)

go



--truncate table preciosV
--drop table PreciosV
create table PreciosV
(
idPreciosV int identity (1,1) not null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto) not null,
cUnitario decimal(18,4) null,
mayorista decimal(18,4) null,
cliente decimal(18,4) null,
transeunte decimal(18,4) null,

)
go


CREATE TABLE UndPorCaja (
    idUndPorCaja INT PRIMARY KEY IDENTITY(1,1),
    idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto) ON DELETE CASCADE not null,
    unidadesxCaja int not null,
    pesoUnidad DECIMAL(10,2) NOT NULL, -- Peso por unidad del producto
    pesoCaja DECIMAL(10,2) NOT NULL, -- Peso total por caja o bulto
    
    
);


go
select * from PreciosV
select * from Productos
go
----------------------------------
--TIENDAS Y EXISTENCIAS
----------------------------------
--drop table Sucursal
create table Sucursal
(
idSucursal UNIQUEIDENTIFIER primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
nombre varchar(20) not null,
direccion varchar(200) null,
--idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
fregistro datetime not null,
estado bit not null
)


go
select * from empresas
select * from DireccionEmpresa
select * from Sucursal
select * from UsuarioWeb
go

--truncate table stockSucursal
--drop table StockSucursal
create table StockSucursal
(
idStockSucursal int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) not null, 
idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal) ON DELETE CASCADE not null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto)  not null,
cantidad decimal(18,2) not null,
ubicacion Varchar(20) null,
fIngreso datetime null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

)
go

--------------------------------------
--compras
----------------------------------------
create table MediosPago
(
	idMediosPago int identity primary key not null,
	codigo varchar(3)not null,
	descripcion varchar(50) not null

)
go
insert into MediosPago values	('001','DEPOSITO EN CUENTA');
insert into MediosPago values	('003','TRANSFERENCIA DE FONDOS');
insert into MediosPago values	('005','TARJETA DEBITO');
insert into MediosPago values	('006','TARJETA CREDITO');
insert into MediosPago values	('009','CONTADO');
insert into MediosPago values	('009','CREDITO');

go
select * from MediosPago

go

CREATE TABLE Moneda(
	idMoneda int identity(1,1) primary key not null,
	codigoc varchar(3) NOT NULL,
	descripcion varchar(20) not NULL,
	simbolo varchar(3) not NULL,

)

go
insert into Moneda values ('PEN','SOLES','S/.')
insert into Moneda values ('USD','DOLLAR','US$')
insert into Moneda values ('EUR','EUROS','€')
select * from moneda
go

create table EstadoPago
(
	idEstadoPago int identity(1,1) primary key not null,
	descripcion varchar(20) not null,
)
go

insert into EstadoPago values	('Pendiente');
insert into EstadoPago values	('Pagado');
go

--truncate table compras
--drop table Compras
create table Compras
(
idcompra UNIQUEIDENTIFIER primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
compCompra varchar(13) not null,
idComprobante int not null,
serie varchar(4) not null,
numero varchar (8) not null,
fEmision datetime not null,
fVencimiento datetime null,
idCliente int not null,
idMoneda int not null,
idEstadoPago int not null,
subTotal decimal(18,2),
igv decimal(18,2),
exonerado decimal(18,2),
gratuito decimal(18,2),
otrosCargos decimal(18,2),
descuentos decimal(18,2),
total decimal(18,2),
idMediosPago int not null, --el estado determinara pendiente o pagado
compRelacionado varchar(50),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

FOREIGN KEY (idComprobante) REFERENCES Comprobantes(idComprobante),
FOREIGN KEY (idMoneda) REFERENCES Moneda (idMoneda),
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
FOREIGN KEY (idMediosPago) REFERENCES MediosPago (idMediosPago),
FOREIGN KEY (idEstadoPago) REFERENCES EstadoPago (idEstadoPago),
)

go

--truncate table DetalleCompras
--drop table DetalleCompras
create table DetalleCompras
(
idDetalleCompra int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) not null ,
idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal) not null, -- Nueva columna
idCompra UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Compras (idCompra) ON DELETE CASCADE not null,
cantidad decimal(18,3) not null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
idPresentacion int not null,
pUnitario decimal(18,5),
total decimal(18,2),
fleteXArticulo DECIMAL(10,5),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,


FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
)

go

--drop table UndPorCaja
CREATE TABLE UndPorCaja (
    idUndPorCaja INT PRIMARY KEY IDENTITY(1,1) not null,
	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE not null,
    idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto) not null,
    unidxCaja int not null,
    pesoUnidad DECIMAL(10,2) NOT NULL, -- Peso por unidad del producto
    pesoCaja DECIMAL(10,2) NOT NULL, -- Peso total por caja o bulto
);

select * from UndPorCaja
