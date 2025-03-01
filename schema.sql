-- Tabla de Clientes (actualizada)
CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    nombre_restaurante VARCHAR(100) NOT NULL,
    nombre_propietario VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    plan_suscripcion VARCHAR(50),
    fecha_registro DATE NOT NULL
);

-- Tabla de Pedidos (actualizada)
CREATE TABLE Pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    tipo VARCHAR(20) CHECK (tipo IN ('Delivery', 'Take Away', 'En el local')),
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'En preparación', 'En camino', 'Entregado', 'Cancelado')),
    total DECIMAL(10, 2) NOT NULL,
    detalles JSON
);

-- Tabla de Reservas
CREATE TABLE Reservas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    fecha_hora TIMESTAMP NOT NULL,
    num_personas INTEGER NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Confirmada', 'Pendiente', 'Cancelada')),
    notas TEXT
);

-- Tabla de Interacciones del Chatbot
CREATE TABLE Interacciones_Chatbot (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    fecha_hora TIMESTAMP NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('Consulta', 'Pedido', 'Reserva', 'Queja', 'Otro')),
    contenido TEXT,
    resultado VARCHAR(50)
);

-- Tabla de Métricas Diarias
CREATE TABLE Metricas_Diarias (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    fecha DATE NOT NULL,
    total_ventas DECIMAL(10, 2) NOT NULL,
    num_pedidos INTEGER NOT NULL,
    num_reservas INTEGER NOT NULL,
    num_interacciones_chatbot INTEGER NOT NULL,
    tasa_conversion DECIMAL(5, 2),
    UNIQUE (cliente_id, fecha)
);

-- Nueva tabla para Inicios de Sesión
CREATE TABLE Inicios_Sesion (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    fecha_hora TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    dispositivo VARCHAR(100)
);

-- Nueva tabla para Compras de Suscripción
CREATE TABLE Compras_Suscripcion (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Clientes(id),
    fecha_hora TIMESTAMP NOT NULL,
    plan VARCHAR(50) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Completada', 'Pendiente', 'Cancelada')),
    metodo_pago VARCHAR(50)
);

