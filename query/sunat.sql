
-------------------------------------
--SUNAT
-------------------------------------

--drop table tributos
create table Tributos
(
	idTributo int identity primary key not null,
	codigo varchar(4) not null,
	descripcion varchar(50) not null,
	nombreT varchar(3) not null
)	
go
select * from Tributos
insert into Tributos values	('1000','IGV Impuesto General a las Ventas','VAT');
insert into Tributos values	('1016','Impuesto a la Venta Arroz Pilado','VAT');
insert into Tributos values	('2000','ISC Impuesto Selectivo al Consumo','EXC');
insert into Tributos values	('7152','Impuesto a la bolsa plastica','OTH');
insert into Tributos values	('9995','Exportaci�n','FRE');
insert into Tributos values	('9996','Gratuito','FRE');
insert into Tributos values	('9997','Exonerado','VAT');
insert into Tributos values	('9998','Inafecto','FRE');
insert into Tributos values	('9999','Otros tributos','OTH');

go

create table EstadoSunat
(
	idEstadoSunat int identity(1,1) primary key not null,
	codigo varchar(3) not null,
	descripcion varchar(30) not null,
)
go

insert into EstadoSunat values	('1','Aceptado');
insert into EstadoSunat values	('2','Aceptado con observaciones');
insert into EstadoSunat values	('3','Rechazado');
insert into EstadoSunat values	('1','Baja');


create table ComprobanteRelacionado
(
	idCompRel int identity primary key not null,
	descripcion varchar(50) not null,
)
insert into ComprobanteRelacionado values ('factura')
insert into ComprobanteRelacionado values ('Guia de remisión')




create table TipoCambio
(
idTipoCambio int identity(1,1) primary key,
descripcion varchar(200),
costo decimal(18,3),
simbolo varchar(3)

)
--go
--insert into TipoCambio values ('SOLES',1,'S/')
--insert into TipoCambio values ('DOLARES AMERICANOS',3.688,'US$')
--insert into TipoCambio values ('EUROS',3.688,'€')
--SELECT * FROM TipoCambio
--go


create table MediosPago
(
	idMediospago varchar(3) primary key not null,
	descripcion varchar(50) not null

)
go
insert into MediosPago values	('001','DEP�SITO EN CUENTA');
insert into MediosPago values	('003','TRANSFERENCIA DE FONDOS');
insert into MediosPago values	('005','TARJETA D�BITO');
insert into MediosPago values	('006','TARJETA CR�DITO');
insert into MediosPago values	('009','CONTADO');
insert into MediosPago values	('009','CR�DITO');

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
