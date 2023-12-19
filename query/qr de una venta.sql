-- Tabla para la información de la factura
CREATE TABLE QrCoprobante (
    idQrCoprobante INT PRIMARY KEY IDENTITY(1,1),
    Ruc VARCHAR(11) NOT NULL,
    TipoDoc VARCHAR(2) NOT NULL,
    Serie VARCHAR(10) NOT NULL,
    Numero INT NOT NULL,
    Emision DATETIME NOT NULL,
    IGV DECIMAL(5, 2) NOT NULL,
    Total DECIMAL(18, 2) NOT NULL,
    ClienteTipo VARCHAR(2) NOT NULL,
    ClienteNumero VARCHAR(20) NOT NULL
);
