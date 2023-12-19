CREATE TABLE Notas (
	idNotas int identity primary key not null,
    UblVersion VARCHAR(10) NOT NULL,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    Correlativo VARCHAR(10) NOT NULL,
    FechaEmision DATETIMEOFFSET NOT NULL,
    TipDocAfectado VARCHAR(2) NOT NULL,
    NumDocAfectado VARCHAR(20) NOT NULL,
    CodMotivo VARCHAR(5) NOT NULL,
    DesMotivo VARCHAR(255) NOT NULL,
    TipoMoneda VARCHAR(3) NOT NULL,
    idEmpresa  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Empresas(idEmpresa) ON DELETE CASCADE,
    idCompania int not null,
    MtoOperGravadas DECIMAL(18, 2) NOT NULL,
    MtoIGV DECIMAL(18, 2) NOT NULL,
    TotalImpuestos DECIMAL(18, 2) NOT NULL,
    MtoImpVenta DECIMAL(18, 2) NOT NULL,
    
	FOREIGN KEY (idCompania) REFERENCES Companias (idCompania),
);


CREATE TABLE DetalleNotas (
	idDetalleNotas int identity primary key not null,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    Correlativo VARCHAR(10) NOT NULL,
    CodProducto VARCHAR(10) NOT NULL,
    Unidad VARCHAR(5) NOT NULL,
    Cantidad INT NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    MtoBaseIgv DECIMAL(18, 2) NOT NULL,
    PorcentajeIgv DECIMAL(5, 2) NOT NULL,
    Igv DECIMAL(18, 2) NOT NULL,
    TipAfeIgv INT NOT NULL,
    TotalImpuestos DECIMAL(18, 2) NOT NULL,
    MtoValorVenta DECIMAL(18, 2) NOT NULL,
    MtoValorUnitario DECIMAL(18, 2) NOT NULL,
    MtoPrecioUnitario DECIMAL(18, 2) NOT NULL,
   
);


---respuesta de sunat para las notas

-- Tabla para la respuesta de SUNAT con CDR
CREATE TABLE RespuestaNotas (
    idRespuestaNotas INT PRIMARY KEY IDENTITY(1,1),
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
