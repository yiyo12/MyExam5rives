CREATE DATABASE 5rives;

use 5rives;

CREATE TABLE persona(
    idCliente bigint(20),
    nombres VARCHAR(80),
    apellidoP VARCHAR(80)
);  

CREATE TABLE Direccion(
    idDireccion bigint(20),
    id_Cliente bigint(20),
    estado VARCHAR(20),
    ciudad VARCHAR(20),
    calle VARCHAR(40),     
    numExt int(3)
);

DESCRIBE persona;
DESCRIBE direccion;