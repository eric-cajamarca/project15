
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


create table EstadosPedidos(
idEstadoPEdido int identity(1,1) primary key,
descripcion varchar(50) not null
)
select * from EstadosPedidos
go

insert into EstadosPedidos values	('Sin Programar');
insert into EstadosPedidos values	('Programado');
insert into EstadosPedidos values	('Enviado');
insert into EstadosPedidos values	('Entregado');



--drop table DetalleCompras