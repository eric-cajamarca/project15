--truncate table estadopago
create table EstadoPago
(
	idEstadoPago int identity(1,1) primary key not null,
	descripcion varchar(20) not null,
)
go

insert into EstadoPago values	('Pendiente');
insert into EstadoPago values	('Pagado');
go
select * from EstadoPago
go

create table EstadosPedidos(
idEstadoPEdido int identity(1,1) primary key,
descripcion varchar(50) not null
)
go
select * from EstadosPedidos
go

insert into EstadosPedidos values	('Sin Programar');
insert into EstadosPedidos values	('Programado');
insert into EstadosPedidos values	('Enviado');
insert into EstadosPedidos values	('Entregado');

go

create table Periodos
(
idPeriodo int identity(1,1) primary key not null,
plazo int not null,
descripcion varchar(20),
)
go

--insert into Periodos values ('Dias')
--insert into Periodos values ('Semanas')
--insert into Periodos values ('Quincenal')
--insert into Periodos values ('Meses')
--insert into Periodos values ('Años')
--go
select * from Periodos


-----------------------------------------------
--CONFIGURACIONES ADICIONALES
-----------------------------------------------
--drop table ModoImpresion
create table ModoImpresion
(
idModoImpresion int identity (1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
descripcion varchar(20),
estado varchar(5)

)
--select * from ModoImpresion
go
--insert into  ModoImpresion values(1,'Tamaño Ticket','False')
--insert into  ModoImpresion values(2,'Tamaño A4','True')

--drop table ImpresorasDisponibles
--truncate table ImpresorasDisponibles
create table ImpresorasDisponibles
(
idImpresorasDisponibles int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
Descripcion varchar(200),
Predeterminado varchar(5)
)

--select * from ImpresorasDisponibles

--insert into  ImpresorasDisponibles values('epson t22','SI')
--insert into  ImpresorasDisponibles values('BROTHER 120','NO')

--DROP TABLE Mostrarpdfs
create table Mostrarpdfs
(
idMostrarPdf int identity(1,1) primary key not null,
idEmpresa UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
idComprobante int not null,
Mostrar varchar(2),
Imprimir varchar(2)

)

select * from Mostrarpdfs