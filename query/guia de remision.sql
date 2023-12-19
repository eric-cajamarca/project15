CREATE TABLE GuiaRemision (
	idGuiaRemision int identity primary key not null,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    Correlativo VARCHAR(10) NOT NULL,
    FechaEmision DATETIMEOFFSET NOT NULL,
    idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
    NumDocDestinatario INT FOREIGN KEY REFERENCES Companias(ruc) NOT NULL,
    NumDocTercero INT FOREIGN KEY REFERENCES Companias(ruc) NOT NULL,
    Observacion VARCHAR(MAX),
    TipoDocBaja VARCHAR(2) NOT NULL,
    NroDocBaja VARCHAR(20) NOT NULL,
    TipoDocRelacionado VARCHAR(2) NOT NULL,
    NroDocRelacionado VARCHAR(20) NOT NULL,
    
	
);




CREATE TABLE EnvioGuiaRemision (
	idEnvioGuiaRemision int identity primary key not null,
	idGuiaRemision int not null,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    Correlativo VARCHAR(10) NOT NULL,
    CodTraslado VARCHAR(2) NOT NULL,
    DesTraslado VARCHAR(255) NOT NULL,
    ModTraslado VARCHAR(2) NOT NULL,
    FecTraslado DATETIMEOFFSET NOT NULL,
    CodPuerto VARCHAR(10),
    IndTransbordo BIT NOT NULL,
    PesoTotal DECIMAL(18, 2) NOT NULL,
    UndPesoTotal VARCHAR(5) NOT NULL,
    NumContenedor VARCHAR(20),
    UbigueoLlegada VARCHAR(10) NOT NULL,
    DireccionLlegada VARCHAR(255) NOT NULL,
    UbigueoPartida VARCHAR(10) NOT NULL,
    DireccionPartida VARCHAR(255) NOT NULL,
    TipoDocTransportista VARCHAR(2) NOT NULL,
    NumDocTransportista VARCHAR(20) NOT NULL,
    RznSocialTransportista VARCHAR(255) NOT NULL,
    PlacaTransportista VARCHAR(10) NOT NULL,
    TipoDocChofer VARCHAR(2) NOT NULL,
    DocChofer VARCHAR(20) NOT NULL,
    
);


CREATE TABLE DetalleGuiaRemision (
	idDetalleGuiaRemision int identity primary key not null,
	idEnvioGuiaRemision int not null,
    Cantidad INT NOT NULL,
    Unidad VARCHAR(5) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Codigo VARCHAR(20) NOT NULL,
    CodProdSunat VARCHAR(20) NOT NULL,
    
);


CREATE TABLE Transportista (
	idTransportista int identity primary key not null,
    idDocumento VARCHAR(1) NOT NULL,
    NumDoc VARCHAR(20) NOT NULL,
    RazonSocial VARCHAR(255) NOT NULL,
    Placa VARCHAR(10) NOT NULL,
    ChoferTipoDoc VARCHAR(2) NOT NULL,
    ChoferDoc VARCHAR(20) NOT NULL,
);



CREATE TABLE RespuestaGuiaRemsion (
    idRespuestaGuiaRemsion INT PRIMARY KEY IDENTITY(1,1),
    Xml NVARCHAR(MAX) NOT NULL,
    Hash NVARCHAR(255) NOT NULL,
    Success BIT NOT NULL,
    ErrorCode NVARCHAR(255),
    ErrorMessage NVARCHAR(MAX),
    CdrZip NVARCHAR(255),
    CdrAccepted BIT,
    CdrId NVARCHAR(255),
    CdrCode NVARCHAR(255),
    CdrDescription NVARCHAR(255),
    Notes NVARCHAR(MAX)
);