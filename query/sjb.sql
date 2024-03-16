create database grupoSJB

use grupoSJB

--truncate table Empresas
--drop table Empresas
CREATE TABLE Empresas(
	idEmpresa UNIQUEIDENTIFIER primary key NOT NULL,
	ruc varchar(11) NULL,
	razon_Social varchar(200) NULL,
	nombreComercial varchar(200) null,
	rubro varchar(200) NULL,
	celular varchar(11) NULL,
	whatsapp varchar(11) NULL,
	correo varchar(100) NULL,
	logo varbinary(max) NULL,
	alias varchar(10) NULL,
)
go

insert into Empresas values ('42099529-43C9-4B7F-921A-3D6FB946E93E','20611688564','EMPRESA FERRETERA AVE FENIX SJB E.I.R.L.','','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','968073361','968073361','',CONVERT(varbinary(max),''),'Fenix');
insert into Empresas values ('BA51C992-7D05-459E-B419-A03358C0A788','20611658495','GRUPO OLITOR SJB E.I.R.L.','','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','968073361','968073361','',CONVERT(varbinary(max),''),'Olitor');
insert into Empresas values ('5615C329-F8B6-4634-B0EF-C02B9F2315B3','10426524541','TORRES NUÑEZ LUCILA','','VENTA AL POR MAYOR Y MENOR DE MATERIALES DE CONSTRUCCIÓN Y ARTÍCULOS DE FERRETERÍA','966818231','966818231','lucilatorressjb@gmail.com',CONVERT(varbinary(max),''),'Lucila');

go 
select * from Empresas

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
	codLocal varchar(10) null
);

insert into DireccionEmpresa values ('42099529-43C9-4B7F-921A-3D6FB946E93E', '060801','PEN','CAJAMARCA','JAEN','JAEN','URB. LOS OLIVOS','PJ. LOS OLIVOS NRO. C-02 URB. H.U PALESTINA (FRENTE AL PARQUE LOS OLIVOS)','');
insert into DireccionEmpresa values ('BA51C992-7D05-459E-B419-A03358C0A788','060801','PEN','CAJAMARCA','JAEN','JAEN' ,'URB. LOS OLIVOS','PJ. LOS OLIVOS C-1 NRO. SN URB. PALESTINA (1ER PISO)','');
insert into DireccionEmpresa values ('5615C329-F8B6-4634-B0EF-C02B9F2315B3','060801','PEN','CAJAMARCA','JAEN','JAEN','URB. LOS OLIVOS','PSJE. LOS OLIVOS S/N URB. LOS OLIVOSPSJE. LOS OLIVOS S/N URB. LOS OLIVOS','');


select * from DireccionEmpresa

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


INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
VALUES
(
    NEWID(),
	'42099529-43C9-4B7F-921A-3D6FB946E93E',
    'Eric',
    'Ortiz Guevara',
	'ericortizguevara@gmail.com',
	'$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',
    'FA018CD9-F8ED-428B-96AD-EE97313E9896', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);

INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
VALUES
(
    NEWID(),
	'BA51C992-7D05-459E-B419-A03358C0A788',
    'Mabel',
    'Hidrogo Paisig',
	'mabel1@gmail.com',
	'$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',
    '849816D6-BF4C-4EA9-9D85-189BA2D8A15C', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);

select * from UsuarioWeb



go

select * from Usuarios
--drop table Documentos


----drop table Empleados
--create table Empleados
--(
--	IdEmpleado UNIQUEIDENTIFIER primary key NOT NULL,
--	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
--	idDocumento varchar(1)FOREIGN KEY REFERENCES Documentos (idDocumento) not null,
--	dni varchar(8) ,
--	nombres varchar (50),
--	apellidos varchar(100),
--	celular varchar (11),
--	direccion varchar(200),
--	puesto varchar (50),
--	fIngreso varchar (10),
--	fNacimiento varchar (10),
--	foto varbinary(max),
--	idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
	
--)
go

--drop table Clientes
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
FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
)
go
select * from Documentos
--select * from Clientes_ruc

INSERT INTO Clientes (idEmpresa, idDocumento, ruc, rSocial, correo,celular,  condicion)
VALUES
(
    '42099529-43C9-4B7F-921A-3D6FB946E93E',
	4,
	'10456333538',
    'Eric Ortiz Guevara',
	'ericortizguevara@gmail.com',
	'999999999',
    'habido'
);
--truncate table Clientes
--truncate table direccionclientes
select * from Clientes
SELECT * FROM DireccionClientes


--drop table DireccionClientes
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

INSERT INTO DireccionClientes (idEmpresa, idCliente, ubigeo, codPais, region, provincia, distrito, urbanizacion, direccion, referencia, codLocal, principal)
VALUES
(
    '42099529-43C9-4B7F-921A-3D6FB946E93E',
	1,
	'060801',
    'PEN',
	'CAJAMARCA',
	'JAEN',
	'jaen',
	'0LOS OLIVOS',
	'LOS JARDINES 1118',
	'MAR ABIERTO',
    'habido',
	0
);

SELECT * FROM DireccionClientes

--create table Proveedors
--(
--idProveedor int identity(1,1) primary key not null,
--idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
--idDocumento varchar(1) not null,
--ruc varchar (11) not null,
--rSocial varchar (200) not null,
--direccion varchar(200) null,
--distrito varchar (50) null,
--ubigeo varchar(12) null,
--celular varchar (50) null,
--correo varchar(100) null,
--condicion varchar(50) null,

--FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
--)
--go

--INSERT INTO Proveedors (idEmpresa, idDocumento, ruc, rSocial, direccion, distrito, ubigeo, celular, correo, condicion)
--VALUES
--(
--    '42099529-43C9-4B7F-921A-3D6FB946E93E',
--	4,
--	'10456333538',
--    'Proveedor Ortiz Guevara',
--	'los jardines 119',
--	'jaen',
--	'060801',
--	'999999999',
--	'ericortizguevara@gmail.com',
--    'habido'
--);
--select * from Proveedors


--DROP TABLE presentacion
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
select * from Sucursal

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


--TRUNCATE TABLE CORRELATIVO
create table Correlativos
(
idCorrelativo int identity (1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
numero int not null,


)
go

insert into Correlativos values('42099529-43C9-4B7F-921A-3D6FB946E93E',500000)
insert into Correlativos values('BA51C992-7D05-459E-B419-A03358C0A788',600000)
insert into Correlativos values('5615C329-F8B6-4634-B0EF-C02B9F2315B3',700000)
go
select * from Correlativos

truncate table Productos
go 
--drop table Productos
create table Productos   
(
idProducto UNIQUEIDENTIFIER primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
Codigo varchar(20) not null,
idCategoria int not null,
descripcion varchar(200) not null,
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

FOREIGN KEY (idCategoria) REFERENCES Categorias (idCategoria),
FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
)

go

INSERT INTO Productos (idProducto, idEmpresa, Codigo, idCategoria, descripcion, idPresentacion, cUnitario, fProduccion, fVencimiento, alertaMinimo, alertaMaximo, VecesVendidas, facturar, idUsuario, FIngreso)
VALUES
(
    NEWID(),
	'42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    '61000',
     1, --idcategoria
	'interruptor simple ',
	10, --idpresentacion
	3.50,
	GETDATE(),
	GETDATE(),
	5,
	200,
	0,
	'SI',
	'082DC0B9-56AC-408D-BDD0-2AECF2F4443C',--id usuario
    GETDATE()
);
go
select * from Productos
SELECT * FROM StockSucursal
select * from UsuarioWeb
go

--truncate table preciosV
--drop table PreciosV
create table PreciosV
(
idPreciosV int identity (1,1) not null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
cUnitario decimal(18,4) null,
mayorista decimal(18,4) null,
cliente decimal(18,4) null,
transeunte decimal(18,4) null,

)
go

INSERT INTO PreciosV (idProducto, mayorista, cliente, transeunte, idusuario)
VALUES
(
	'6C523685-D1FA-4B5F-822A-C052B3B49D6B',--idProducto
    4,
    5,
	6,
	'9B697C80-FFE8-4C91-9362-98FE4D5221D8'--id usuario
);
go
select * from PreciosV
select * from Productos
--create table HistorialProductos
--(
--idHistorialP int identity(1,1) primary key not null,
--idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
--Fecha date not null,
--idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
--descripcion varchar(100), 
--idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
--)

--go

----------------------------------
--TIENDAS Y EXISTENCIAS
----------------------------------
--drop table Sucursal
create table Sucursal
(
idSucursal UNIQUEIDENTIFIER primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
nombre varchar(20) not null,
direccion varchar(200) null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
fregistro datetime not null
)

go
INSERT INTO Sucursal (idSucursal,idEmpresa, nombre, direccion,idUsuario, fregistro)
VALUES
(
	NEWID(),
	'42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    'Linderos',
     'Linderos',
	'5C4491C7-D15D-4EAE-9610-3F999EA40F56',--id usuario
    GETDATE()
);
go
select * from Sucursal
select * from UsuarioWeb
go

--truncate table stockSucursal
--drop table StockSucursal
create table StockSucursal
(
idStockSucursal int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa), 
idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal) ON DELETE CASCADE,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
cantidad decimal(18,2) not null,
ubicacion Varchar(20) null,
fIngreso datetime null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

)
go

INSERT INTO StockSucursal (idEmpresa,idSucursal, idProducto, cantidad, ubicacion, fIngreso, idUsuario)
VALUES
(
	'42099529-43C9-4B7F-921A-3D6FB946E93E', --idempresa
    '10647937-80AF-4EF6-B20E-42E34E85BCF2', --idsucursal
    '1CEB5F9A-9054-4573-A6DD-27566E3059D1', --idproducto
	200, --cantidad
	'andamio2',
	GETDATE(),
	'B5E9E176-7DE5-483D-A8BE-740BF79BBF90'--id usuario
);
go
select * from Empresas
select * from Sucursal
select * from UsuarioWeb
select * from StockSucursal
select * from Productos
SELECT * FROM PreciosV
SELECT * FROM DetalleCompras
select * from compras

--DROP TABLE ORDENESALIDA
go
create table OrdenSalida
(
idOrdenSalida int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
fechaSalida datetime not null,
responsable varchar(200) null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
cantidad decimal(18,3) null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
)

go
--TRUNCATE TABLE ComprobantesTienda02
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


--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','01','Factura','F001','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','03','Boleta','B001','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','07','Nota de credito','BC01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','07','Nota de credito','FC01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','08','Nota de dedito','BD01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','08','Nota de dedito','FD01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','RA','Comunicacion de baja','-','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','RC','Resumen diario','-','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','10','Guia Remitente','TG01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','11','Guia Transportista','RG01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','LT','Letra por cobrar','LT','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','TK','Ticket de despacho','TK01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','NP','Nota de pedido','NP01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','CT','Cotizacion','CT01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','NE','Nota de envio','NE01','1')
--insert into Comprobantes values	('BA51C992-7D05-459E-B419-A03358C0A788','RP','Recibo de pago','RP01','1')
--go

--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','01','Factura','F001','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','03','Boleta','B001','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','07','Nota de credito','BC01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','07','Nota de credito','FC01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','08','Nota de dedito','BD01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','08','Nota de dedito','FD01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','RA','Comunicacion de baja','-','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','RC','Resumen diario','-','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','10','Guia Remitente','TG01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','11','Guia Transportista','RG01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','LT','Letra por cobrar','LT','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','TK','Ticket de despacho','TK01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','NP','Nota de pedido','NP01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','CT','Cotizacion','CT01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','NE','Nota de envio','NE01','1')
--insert into Comprobantes values	('5615C329-F8B6-4634-B0EF-C02B9F2315B3','RP','Recibo de pago','RP01','1')




go
--------------------------------.
--COMPRAS
---------------------------------
truncate table compras
--drop table Compras
create table Compras
(
idcompra UNIQUEIDENTIFIER primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
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

INSERT INTO Compras (idEmpresa, compCompra, idComprobante, serie, numero, fEmision, fVencimiento, idProveedor, idMoneda, idEstadoPago, subTotal, igv, exonerado, gratuito, otrosCargos, descuentos, total, idMediosPago, compRelacionado, idUsuario)
VALUES
(
	'42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    'f001-00000007',
     1, --idcomprobante
	'f001',
	'00000007',
	GETDATE(),
	GETDATE(),
	1,	--proveedor
	1, --moneda
	1, --idestadopago
	10,
	0,
	0,
	0,
	0,
	0,
	10,
	'009',--mediospago
	'',
	'9B697C80-FFE8-4C91-9362-98FE4D5221D8'--id usuario
);
go
select * from compras
select * from Productos

--truncate table DetalleCompras
--drop table DetalleCompras
create table DetalleCompras
(
idDetalleCompra int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ,
idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal) , -- Nueva columna
idCompra UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Compras (idCompra) ON DELETE CASCADE,
cantidad decimal(18,3) not null,
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
idPresentacion int not null,
pUnitario decimal(18,5),
total decimal(18,2),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,


FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
)

INSERT INTO DetalleCompras (idEmpresa,idSucursal, idcompra,  Cantidad,idproducto, idPresentacion, pUnitario,total, idUsuario)
VALUES
(
	'42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    'E50017E1-B809-41FD-92F4-8AD9163D2E92',--id sucursal
	1,
	50.0, --cantidad
    '6C523685-D1FA-4B5F-822A-C052B3B49D6B', --idproducto
	10,
	3.5,
	175.00,
	'9B697C80-FFE8-4C91-9362-98FE4D5221D8'--id usuario
);
go

SELECT * FROM Productos
select * from PreciosV
select * from Correlativos
--UPDATE Correlativos SET numero = 500050 WHERE idCorrelativo = 1;

select * from compras
select * from DetalleCompras
SELECT * FROM StockSucursal
go

create table BorradorCompras
(
idBorradorCompras int identity(1,1) not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
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
--drop table Ventas
CREATE TABLE Ventas
(
	idVentas int identity(1,1) primary key not null,
	idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	compVenta varchar(13) NOT NULL,
	idComprobante int not NULL,
	serie varchar(4) not NULL,
	numero varchar(8) not NULL,
	fEmision datetime not NULL,
	fVencimiento datetime not NULL,
	idDocumento varchar(1) not NULL,
	idCliente int NULL,
	idMoneda int NULL,
	idMediosPago varchar(3) not NULL, --contado, deposito...
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
	idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

	FOREIGN KEY (idComprobante) REFERENCES Comprobantes (idComprobante),
	FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
	FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
	FOREIGN KEY (idMoneda) REFERENCES Moneda (idMoneda),
	FOREIGN KEY (idMediosPago) REFERENCES MediosPago (idMediosPago),
	FOREIGN KEY (idEstadoPago) REFERENCES EstadoPago (idEstadoPago),
	FOREIGN KEY (idEstadoPedido) REFERENCES EstadosPedidos (idEstadoPedido),
	FOREIGN KEY (idEstadoSunat) REFERENCES EstadoSunat (idEstadoSunat),
	FOREIGN KEY (idCompRel) REFERENCES ComprobanteRelacionado (idCompRel),
	
)
INSERT INTO Ventas (
    idEmpresa,
    compVenta,
    idComprobante,
    serie,
    numero,
    fEmision,
    fVencimiento,
    idDocumento,
    idCliente,
    idMoneda,
    idMediosPago,
    subTotal,
    igv,
    exonerado,
    gratuito,
    icbper,
    otrosCargos,
    descuentos,
    total,
    idEstadoPago,
    idEstadoPedido,
    idEstadoSunat,
    idCompRel,
    idUsuario
)
VALUES (
    -- Reemplazar con valores válidos o correctos
    '42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    'F001-0000008', -- varchar(13)
    2, -- idComprobante
    'F001', -- varchar(4)
    '0000004', -- varchar(8)
    GETDATE(), -- varchar(10)
    GETDATE(), -- varchar(10)
    '1', -- varchar(1)
    1, -- int
    1, -- int
    '009', -- varchar(3)
    100.00, -- decimal(18, 2)
    18.00, -- decimal(18, 2)
    0.00, -- decimal(18, 2)
    0.00, -- decimal(18, 2)
    0.00, -- decimal(18, 2)
    0.00, -- decimal(18, 2)
    5.00, -- decimal(18, 2)
    750.00, -- decimal(18, 2)
    1, -- int
    1, -- int
    1, -- int
    1, -- int
    '9B697C80-FFE8-4C91-9362-98FE4D5221D8'--id usuario
);


select * from ventas
select * from Caja


--drop table detalleVentas
--CREATE TABLE DetalleVentas(
--	idDetalleVenta int identity(1,1) primary key NOT NULL,
--	idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
--	idStockSucursal int not null,
--	idVentas int not NULL,
--	cantidad decimal(18, 3) not NULL,
--	idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
--	--[Descripcion] [varchar](200) NULL,
--	idPresentacion int not NULL,
--	pVenta decimal(18, 5) not NULL,
--	descuentos decimal(18, 2) NULL,
--	igv decimal(18, 2) NULL,
--	ISC decimal(18, 2) NULL,
--	total decimal(18, 2) NULL,
--	cantEntregado decimal(18, 2) NULL,
--	hVenta varchar(10) NULL,

	
--	FOREIGN KEY (idVentas) REFERENCES Ventas (idVentas),
--	FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
--	FOREIGN KEY (idStockSucursal) REFERENCES StockSucursal (idStockSucursal),
--)

--drop table detalleventas
CREATE TABLE DetalleVentas
(
    idDetalleVenta INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
    idSucursal UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Sucursal(idSucursal), -- Nueva columna
	idVentas INT NOT NULL,
    cantidad DECIMAL(18, 3) NOT NULL,
    idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
    idPresentacion INT NOT NULL,
    pVenta DECIMAL(18, 5) NOT NULL,
    descuentos DECIMAL(18, 2) NULL,
    igv DECIMAL(18, 2) NULL,
    ISC DECIMAL(18, 2) NULL,
    total DECIMAL(18, 2) NULL,
    cantEntregado DECIMAL(18, 2) NULL,
    hVenta VARCHAR(10) NULL,

    FOREIGN KEY (idVentas) REFERENCES Ventas (idVentas),
    FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion)
);

go

select * from DetalleVentas

INSERT INTO DetalleVentas (
    idEmpresa,
	idSucursal,
    idVentas,
    cantidad,
    idProducto,
    idPresentacion,
    pVenta,
    descuentos,
    igv,
    ISC,
    total,
    cantEntregado,
    hVenta
)
VALUES (
    -- Reemplazar con valores válidos o correctos
    '42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
	'E50017E1-B809-41FD-92F4-8AD9163D2E92',
    7, -- idVentas
    40.0, -- cantidad
    '6C523685-D1FA-4B5F-822A-C052B3B49D6B', --idproducto
    1, -- idPresentacion
    10.5, -- pVenta
    0, -- descuentos
    0, -- igv
    0, -- ISC
    113, -- total
    0, -- cantEntregado
    '12:30' -- hVenta
);
select * from DetalleCompras
select * from DetalleVentas
select * from StockSucursal

CREATE TABLE BorradorVenta(
	idBorradorVenta int identity(1,1) primary key not null,
	idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	cantidad decimal(18, 3) NULL,
	codigo varchar(50) NULL,
	descripcion varchar(200) NULL,
	presentacion varchar(3) NULL,
	pVenta decimal(18, 5) NULL,
	total decimal(18, 2) NULL,
	alias varchar(50) NULL
)

GO

--truncate table caja
--drop table Caja
CREATE TABLE Caja(
	idCaja int identity(1,1) primary key not null,
	idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	fecha datetime NOT NULL,
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
	total decimal(18,2) null
	FOREIGN KEY (idEmpresa) REFERENCES Empresas(idEmpresa),
);


INSERT INTO Caja (
    idEmpresa,
    fecha,
    estadoAC,
    horaAC,
    usuarioAC,
    efectivoAC,
    estadoCC,
    horaCC,
    usuarioCC,
    efectivoCC,
    transferencia,
    tarjeta,
    credito,
	total
)
VALUES (
    -- Reemplaza con valores válidos o correctos
    '42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    GETDATE(), -- date
    'Abierto', -- estadoAC
    '10:00 AM', -- horaAC
    'viviana',--id usuario
    100.00, -- efectivoAC
    'Cerrado', -- estadoCC
    '05:00 PM', -- horaCC
    'eric',--id usuario
    0.00, -- efectivoCC
    0.00, -- transferencia
    0.00, -- tarjeta
    0.00, -- credito
	0.00
);

select * from Caja

CREATE TABLE Cotizaciones(
	idCotizacion int identity(1,1) primary key not null,
	idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE, 
	serieNumero char(13) NOT NULL,
	idComprobante int NULL,
	serie varchar(4) NULL,
	numero varchar(8) NULL,
	fEmision datetime NULL,
	fVencimiento datetime NULL,
	idDocumento varchar(1) not NULL,
	idCliente int not null,
	moneda varchar(20) NULL,
	idCondicionPago int NULL,
	total decimal (18, 2) NULL,
	idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,
	Conversion varchar(13) NULL,

	FOREIGN KEY (idComprobante) REFERENCES Comprobantes (idComprobante),
	FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
	FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
	)

	select * from cotizaciones


	INSERT INTO Cotizaciones (idEmpresa,serieNumero,idComprobante,serie,numero,fEmision,fVencimiento,idDocumento,idCliente,moneda,idCondicionPago,total,idUsuario,Conversion)
VALUES (
    '42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    'COT-00000001',
    1, -- Reemplaza con el valor correcto para idComprobante
    'F001',
    '12345',
    GETDATE(),
    GETDATE(),
    '1', -- Reemplaza con el valor correcto para idDocumento
    1, -- Reemplaza con el valor correcto para idCliente
    'PEN',
    1, -- Reemplaza con el valor correcto para idCondicionPago
    500.00, -- Reemplaza con el valor correcto para total
    '9B697C80-FFE8-4C91-9362-98FE4D5221D8',--id usuario
    'factura'
);



	CREATE TABLE DetalleCotizacion(
	idDetalleCotizacion int IDENTITY(1,1) primary key NOT NULL,
	idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
	idCotizacion int not null,
	cantidad decimal(18, 3) NULL,
	codigo varchar(50) NULL,
	descripcion varchar(200) NULL,
	idPresentacion int not NULL,
	pVenta decimal(18, 5) NULL,
	descuentos decimal(18, 2) NULL,
	igv decimal(18, 2) NULL,
	ISC decimal(18, 2) NULL,
	total decimal(18, 2) NULL,
	idSucursal UNIQUEIDENTIFIER not null,
	hVenta varchar(10) NULL,

	FOREIGN KEY (idCotizacion) REFERENCES Cotizaciones (idCotizacion),
	FOREIGN KEY (idSucursal) REFERENCES Sucursal (idSucursal),
	FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),
	
	
)


INSERT INTO DetalleCotizacion (idEmpresa,idCotizacion,cantidad,codigo,descripcion,idPresentacion,pVenta,descuentos,igv,ISC,total,idSucursal,hVenta)
VALUES (
    '42099529-43C9-4B7F-921A-3D6FB946E93E',--idempresa
    1, -- Reemplaza con el valor correcto para idCotizacion
    10.5, -- Reemplaza con el valor correcto para cantidad
    'ABC123', -- Reemplaza con el valor correcto para codigo
    '6C523685-D1FA-4B5F-822A-C052B3B49D6B',--id producto
    1, -- Reemplaza con el valor correcto para idPresentacion
    50.12345, -- Reemplaza con el valor correcto para pVenta
    5.75, -- Reemplaza con el valor correcto para descuentos
    10.25, -- Reemplaza con el valor correcto para igv
    2.5, -- Reemplaza con el valor correcto para ISC
    500.75, -- Reemplaza con el valor correcto para total
    'E50017E1-B809-41FD-92F4-8AD9163D2E92', -- Reemplaza con el valor correcto para idSucursal
    GETDATE() -- Reemplaza con el valor correcto para hVenta
);

select * from Productos


SELECT
    C.*,
    DC.*
FROM
    Cotizaciones C
JOIN
    DetalleCotizacion DC ON C.idCotizacion = DC.idCotizacion
WHERE
    C.idCotizacion = 1; -- Reemplaza con el ID de cotización que estás buscando

--============================================================================================================================================================
--RESTO DE TABLAS
--============================================================================================================================================================

------------------------------
--------CUENTAS X PAGAR
-------------------------------

--drop table CuentasxPagar

create table CuentasxPagar
(
idCuentaxPagar int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa),
idCliente int not null,
idCompra UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Compras (idCompra) ON DELETE CASCADE,
fEmision datetime not null,
fVencimiento datetime not null,
total decimal(18,2),
idPeriodo int not null,
cuota decimal(18,2),
cPagadas varchar(2),
saldo decimal(18,2),
ctaBanco varchar(50),
Estado varchar(50),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
FOREIGN KEY (idPeriodo) REFERENCES Periodos (idPeriodo),
)
go


go
---drop table HistorialCXP
create table HistorialCXP
(
idHistorialCXP int identity(1,1) not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
fecha datetime,
idCuentaxPagar int not null,
idCliente int not null,
nroCuota int,
nroDocpago varchar(13),
responsable varchar(200),
total decimal(18,2),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

FOREIGN KEY (idCuentaxPagar) REFERENCES CuentasxPagar (idCuentaxPagar),
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),

)

go

go

create table DetalleCuotasCXP
(
idDetalleCuotaCxP int identity(1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idCuentaxPagar int not null,
NroCuota int,
Monto decimal(18,2),
FVencimiento varchar(10),
Moneda varchar(20),

FOREIGN KEY (idCuentaxPagar) REFERENCES CuentasxPagar (idCuentaxPagar),
)




------------------------------
--------CUENTAS X COBRAR
-------------------------------

--drop table CuentasxPagar

create table CuentasxCobrar
(
idCuentaxCobrar int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idCliente int not null,
idVentas int not null,
fEmision datetime null,
fVencimiento datetime null,
total decimal(18,2) not null,
idPeriodo int not null,
cuota decimal(18,2) null,
cPagadas varchar(2) null,
saldo decimal(18,2) null,
ctaBanco varchar(50) null,
Estado varchar(50)null,
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
FOREIGN KEY (idVentas) REFERENCES Ventas (idVentas),
FOREIGN KEY (idPeriodo) REFERENCES Periodos (idPeriodo),
)
go


go
---drop table HistorialCXP
create table HistorialCXC
(
idHistorialCXC int identity(1,1) not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
fecha datetime,
idCuentaxCobrar int not null,
nroCuota int,
nroDocpago varchar(13),
responsable varchar(200),
total decimal(18,2),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,


FOREIGN KEY (idCuentaxCobrar) REFERENCES CuentasxCobrar (idCuentaxCobrar),
)

go

go

create table DetalleCuotasCXC
(
idDetalleCuotaCXC int identity(1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idCuentaxCobrar int not null,
NroCuota int,
Monto decimal(18,2),
FVencimiento varchar(10),
Moneda varchar(20),

FOREIGN KEY (idCuentaxCobrar) REFERENCES CuentasxCobrar (idCuentaxCobrar),
)

--==============================================
--TABLAS PROVICIONALES PARA VENTAS
--==============================================
--drop table ProvicionalTienda01
create table Provicional
(
idProvicional int identity (1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
--idCompro varchar(20),
fecha datetime,
ruc varchar(11),
cliente char(200) ,
cantidad decimal(18,3),
codigo varchar(50),
descripcion varchar(200),
presentacion varchar(20),
pVenta decimal(18,5),
total decimal(18,2),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

)

--select * from ProvicionalTienda01
go

create table NoFacturado
(
idNoFacturado int identity(1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idVentas int  null,
fecha datetime,
idCliente int not null,
Cantidad decimal(18,3),
idProducto UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Productos (idProducto),
idPresentacion int not null,
pVenta decimal(18,5),
total decimal(18,2),
idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UsuarioWeb (idUsuario) not null,

FOREIGN KEY (idVentas) REFERENCES Ventas (idVentas),
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
FOREIGN KEY (idPresentacion) REFERENCES Presentacion (idPresentacion),

)

