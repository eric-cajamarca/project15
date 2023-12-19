----facturas y boletas

-- Tabla para la dirección (reutilizable para client y company)
CREATE TABLE Address (
    AddressId INT PRIMARY KEY IDENTITY(1,1),
    Direccion VARCHAR(255),
    Provincia VARCHAR(50),
    Departamento VARCHAR(50),
    Distrito VARCHAR(50),
    Ubigeo VARCHAR(10)
);

go

CREATE TABLE Empresas (
    idEmpresa UNIQUEIDENTIFIER PRIMARY KEY,
    Ruc varchar(11) not null,
    RazonSocial VARCHAR(255) not null,
    NombreComercial VARCHAR(255) null,
	Celular varchar(11) NULL,
	Whatsapp varchar(11) NULL,
	Correo varchar(100) NULL,
	Logo varbinary(max) NULL,
	Alias varchar(29) NULL,

    AddressId INT FOREIGN KEY REFERENCES Address(AddressId)

);


insert into Empresas values ('42099529-43C9-4B7F-921A-3D6FB946E93E','20611688564','EMPRESA FERRETERA AVE FENIX SJB E.I.R.L.','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','PJ. LOS OLIVOS NRO. C-02 URB. H.U PALESTINA (FRENTE AL PARQUE LOS OLIVOS)','JAEN','CAJAMARCA','JAEN','968073361','968073361','',CONVERT(varbinary(max),''),'Fenix');
insert into Empresas values ('BA51C992-7D05-459E-B419-A03358C0A788','20611658495','GRUPO OLITOR SJB E.I.R.L.','VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA...','PJ. LOS OLIVOS C-1 NRO. SN URB. PALESTINA (1ER PISO)','JAEN','CAJAMARCA','JAEN','968073361','968073361','',CONVERT(varbinary(max),''),'Olitor');
insert into Empresas values ('5615C329-F8B6-4634-B0EF-C02B9F2315B3','10426524541','TORRES NUÑEZ LUCILA','VENTA AL POR MAYOR Y MENOR DE MATERIALES DE CONSTRUCCIÓN Y ARTÍCULOS DE FERRETERÍA','PSJE. LOS OLIVOS S/N URB. LOS OLIVOSPSJE. LOS OLIVOS S/N URB. LOS OLIVOS','JAEN','CAJAMARCA','JAEN','966818231','966818231','lucilatorressjb@gmail.com',CONVERT(varbinary(max),''),'Lucila');



select * from Empresas

go


--drop table Rol
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
	fregistro date NOT NULL,
	
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
    '86AF7535-6DBC-4A73-94EC-6D016655D0B6', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);

INSERT INTO UsuarioWeb (idUsuario, idEmpresa, nombres, apellidos, email, password, idRol, estado, fregistro)
VALUES
(
    NEWID(),
	'BA51C992-7D05-459E-B419-A03358C0A788',
    'Mabel1',
    'Hidrogo Paisig1',
	'mabel1@gmail.com',
	'$2a$08$iD7U/5D7Kc.BOH06wQg/.uGB7pY9CNSd2LYwEabV3QM9GCHIYQmby',
    '86AF7535-6DBC-4A73-94EC-6D016655D0B6', -- Utiliza directamente el identificador único
    1,
    GETDATE()
);

select * from UsuarioWeb


--drop table Clientes
create table Clientes
(
idCliente int identity (1,1) primary key not null,
idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idDocumento varchar(1) not null,
ruc varchar(11) not null,
rSocial varchar(200) not null,
direccion varchar(200) not null,
referencia text null,
distrito varchar(50) null,
ubigeo varchar(12) null,
celular varchar (50) null,
correo varchar(100) null,
condicion varchar(50) null,
FOREIGN KEY (idDocumento) REFERENCES Documentos (idDocumento),
)
go
select * from Documentos
--select * from Clientes_ruc

INSERT INTO Clientes (idEmpresa, idDocumento, ruc, rSocial, direccion, referencia, distrito, ubigeo, celular, correo, condicion)
VALUES
(
    '42099529-43C9-4B7F-921A-3D6FB946E93E',
	4,
	'10456333538',
    'Eric Ortiz Guevara',
	'los jardines 119',
	'por mar habierto',
	'jaen',
	'060801',
	'999999999',
	'ericortizguevara@gmail.com',
    'habido'
);
--truncate table Clientes
select * from Clientes




CREATE TABLE Cliente (
    Id INT PRIMARY KEY IDENTITY(1,1),
    tipoDoc VARCHAR(2),
    numDoc INT,
    rznSocial VARCHAR(255),
    addressId INT FOREIGN KEY REFERENCES Address(Id)
);

CREATE TABLE Empresa (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ruc INT,
    razonSocial VARCHAR(255),
    nombreComercial VARCHAR(255),
    addressId INT FOREIGN KEY REFERENCES Address(Id)
);

CREATE TABLE Detalle (
    Id INT PRIMARY KEY IDENTITY(1,1),
    codProducto VARCHAR(10),
    unidad VARCHAR(5),
    descripcion VARCHAR(255),
    cantidad INT,
    mtoValorUnitario DECIMAL(18, 2),
    mtoValorVenta DECIMAL(18, 2),
    mtoBaseIgv DECIMAL(18, 2),
    porcentajeIgv DECIMAL(5, 2),
    igv DECIMAL(18, 2),
    tipAfeIgv INT,
    totalImpuestos DECIMAL(18, 2),
    mtoPrecioUnitario DECIMAL(18, 2)
);


CREATE TABLE Factura (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ublVersion VARCHAR(10),
    tipoOperacion VARCHAR(4),
    tipoDoc VARCHAR(2),
    serie VARCHAR(10),
    correlativo VARCHAR(10),
    fechaEmision DATETIMEOFFSET,
    formaPagoId INT FOREIGN KEY REFERENCES FormaPago(Id),
    tipoMoneda VARCHAR(3),
    clienteId INT FOREIGN KEY REFERENCES Cliente(Id),
    empresaId INT FOREIGN KEY REFERENCES Empresa(Id),
    mtoOperExoneradas DECIMAL(18, 2),
    mtoIGV DECIMAL(18, 2),
    totalImpuestos DECIMAL(18, 2),
    valorVenta DECIMAL(18, 2),
    subTotal DECIMAL(18, 2),
    mtoImpVenta DECIMAL(18, 2)
);

CREATE TABLE FacturaDetalle (
    FacturaId INT FOREIGN KEY REFERENCES Factura(Id),
    DetalleId INT FOREIGN KEY REFERENCES Detalle(Id),
    PRIMARY KEY (FacturaId, DetalleId)
);

CREATE TABLE FacturaLeyenda (
    FacturaId INT FOREIGN KEY REFERENCES Factura(Id),
    LeyendaId INT FOREIGN KEY REFERENCES Leyenda(Id),
    PRIMARY KEY (FacturaId, LeyendaId)
);



-- Tabla para almacenar la información principal
CREATE TABLE FacturaElectronica (
    FacturaElectronicaId INT PRIMARY KEY IDENTITY(1,1),
    Xml NVARCHAR(MAX) NOT NULL,
    Hash NVARCHAR(255) NOT NULL,
    CdrZip NVARCHAR(255) NOT NULL,
    Success BIT NOT NULL,
    SunatResponseCode NVARCHAR(255),
    SunatResponseMessage NVARCHAR(255),
    CdrAccepted BIT,
    CdrId NVARCHAR(255),
    CdrCode NVARCHAR(255),
    CdrDescription NVARCHAR(255),
    CONSTRAINT UQ_FacturaElectronica UNIQUE (Hash) -- Asegura que el hash sea único
);

-- Tabla para almacenar las notas
CREATE TABLE Notas (
    NotaId INT PRIMARY KEY IDENTITY(1,1),
    FacturaElectronicaId INT,
    NotaTexto NVARCHAR(255) NOT NULL,
    FOREIGN KEY (FacturaElectronicaId) REFERENCES FacturaElectronica(FacturaElectronicaId)
);
