

-- Tabla para la información general
CREATE TABLE Baja (
    idBaja INT PRIMARY KEY IDENTITY(1,1),
    Correlativo VARCHAR(50) NOT NULL,
    FecGeneracion DATETIMEOFFSET NOT NULL,
    FecComunicacion DATETIMEOFFSET NOT NULL,
    idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
);

CREATE TABLE DetalleBaja (
    idDetalleBaja INT PRIMARY KEY IDENTITY(1,1),
	idBaja int not null,
    Correlativo VARCHAR(50) NOT NULL,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    CorrelativoDocumento VARCHAR(50) NOT NULL,
    DesMotivoBaja VARCHAR(255) NOT NULL,
    
	FOREIGN KEY (idBaja) REFERENCES Baja (idBaja),
);


CREATE TABLE RespuestaBaja (
    idRespuestaBaja INT PRIMARY KEY IDENTITY(1,1),
    Xml VARCHAR(MAX) NOT NULL,
    Hash VARCHAR(255) NOT NULL,
    Success BIT NOT NULL,
    ErrorMessage NVARCHAR(MAX),
    Ticket NVARCHAR(255) NOT NULL
);
