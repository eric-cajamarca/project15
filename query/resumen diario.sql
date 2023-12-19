
-- Tabla para la información general del resumen
CREATE TABLE ResumenDiario (
    idResumenDiario INT PRIMARY KEY IDENTITY(1,1),
    FecGeneracion DATETIMEOFFSET NOT NULL,
    FecResumen DATETIMEOFFSET NOT NULL,
    Correlativo VARCHAR(10) NOT NULL,
    Moneda VARCHAR(3) NOT NULL,
    idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
);

-- Tabla para los detalles del resumen
CREATE TABLE DetalleResumen (
    idDetalleResumen INT PRIMARY KEY IDENTITY(1,1),
    idResumenDiario INT FOREIGN KEY REFERENCES ResumenDiario(idResumenDiario) NOT NULL,
    TipoDoc VARCHAR(2) NOT NULL,
    SerieNro VARCHAR(20) NOT NULL,
    Estado VARCHAR(1) NOT NULL,
    ClienteTipo VARCHAR(1) NOT NULL,
    ClienteNro VARCHAR(20) NOT NULL,
    Total DECIMAL(18, 3) NOT NULL,
    MtoOperGravadas DECIMAL(18, 3) NOT NULL,
    MtoOperInafectas DECIMAL(18, 3) NOT NULL,
    MtoOperExoneradas DECIMAL(18, 3) NOT NULL,
    MtoOperExportacion DECIMAL(18, 3) NOT NULL,
    MtoOtrosCargos DECIMAL(18, 3) NOT NULL,
    MtoIGV DECIMAL(18, 3) NOT NULL
);


-- Tabla para la respuesta de SUNAT
CREATE TABLE RespuestaResumen (
    idRespuestaResumen INT PRIMARY KEY IDENTITY(1,1),
    Xml NVARCHAR(MAX) NOT NULL,
    Hash NVARCHAR(255) NOT NULL,
    Success BIT NOT NULL,
    ErrorCode NVARCHAR(255),
    ErrorMessage NVARCHAR(MAX),
    Ticket NVARCHAR(255) NOT NULL
);
