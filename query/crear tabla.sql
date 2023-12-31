USE [sistema]
GO

/****** Object:  Table [dbo].[usuarioWeb]    Script Date: 05/11/2023 18:24:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--drop table usuarioWeb
CREATE TABLE usuarioWeb(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[apellidos] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [text] NOT NULL,
	[rol] [nchar](20) NOT NULL,
	[estado] [bit] NOT NULL,
	[fregistro][varchar](50) NOT NULL
 CONSTRAINT [PK_usuarioWeb] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


select * from usuarioWeb

--drop table EstadosPedidos
--Estados de Entrega Pedidos
create table EstadosPedidos(
idEstado int identity(1,1) primary key,
descripcion varchar(50) not null
)
select * from EstadosPedidos

CREATE TABLE ProgramacionPedidos(
	idProgramacion int primary key,
	idCompVentas varchar(13) not null,
	--FVenta varchar(10) NULL,
	FEnvio varchar(10) NULL,
	idCliente int not null,
	--Ruc varchar(11) NULL,
	--RSocial varchar(200) NULL,
	--Direccion varchar(200) NULL,
	--Distrito varchar(50) NULL,
	Referencia varchar(200) NULL,
	--Celular varchar(50) NULL,
	Observaciones varchar(200) NULL,
	PagoXflete decimal(18, 2) NULL,
	idEmpresa varchar(20) not null,
	idEstado int not null
)

select * from Empresa

CREATE TABLE Empresa(
	idEmpresa int IDENTITY(1,1) NOT NULL,
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