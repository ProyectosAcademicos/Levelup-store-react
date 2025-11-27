-- Tabla de productos
-- CREATE TABLE productos (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(255) NOT NULL,
--     descripcion VARCHAR(1000),
--     precio DECIMAL(10, 2) NOT NULL,
--     imagen_url VARCHAR(500),
--     img_file VARCHAR(255),
--     stock INT NOT NULL DEFAULT 0,
--     categoria VARCHAR(100),
--     activo BOOLEAN DEFAULT TRUE,
--     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     INDEX idx_categoria (categoria),
--     INDEX idx_activo (activo)
-- );

-- Tabla de órdenes
-- CREATE TABLE ordenes (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     usuario_id BIGINT NOT NULL,
--     total DECIMAL(10, 2) NOT NULL,
--     estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
--     metodo_pago VARCHAR(100),
--     direccion_envio VARCHAR(500),
--     telefono VARCHAR(20),
--     notas VARCHAR(500),
--     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
--     INDEX idx_usuario (usuario_id),
--     INDEX idx_estado (estado)
-- );

-- Tabla de detalles de orden
-- CREATE TABLE orden_detalles (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     orden_id BIGINT NOT NULL,
--     producto_id BIGINT NOT NULL,
--     cantidad INT NOT NULL,
--     precio_unitario DECIMAL(10, 2) NOT NULL,
--     subtotal DECIMAL(10, 2) NOT NULL,
--     FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
--     FOREIGN KEY (producto_id) REFERENCES productos(id),
--     INDEX idx_orden (orden_id),
--     INDEX idx_producto (producto_id)
-- );

-- Tabla de carrito (para persistir entre sesiones)
-- CREATE TABLE carritos (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     usuario_id BIGINT NOT NULL,
--     producto_id BIGINT NOT NULL,
--     cantidad INT NOT NULL DEFAULT 1,
--     agregado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
--     FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
--     UNIQUE KEY unique_user_product (usuario_id, producto_id),
--     INDEX idx_usuario (usuario_id)
-- );

-- Insertar regiones
INSERT INTO regiones (id, nombre) VALUES
(1, "Arica y Parinacota"),
(2, "Tarapacá"),
(3, "Antofagasta"),
(4, "Atacama"),
(5, "Coquimbo"),
(6, "Valparaíso"),
(7, "Metropolitana de Santiago"),
(8, "O’Higgins"),
(9, "Maule"),
(10, "Ñuble"),
(11, "Biobío"),
(12, "La Araucanía"),
(13, "Los Ríos"),
(14, "Los Lagos"),
(15, "Aysén"),
(16, "Magallanes y Antártica");

-- Región 1 — Arica y Parinacota
INSERT INTO comunas (region_id, nombre) VALUES
(1, 'Arica'),
(1, 'Camarones'),
(1, 'Putre'),
(1, 'General Lagos');

-- Región 2 — Tarapacá
INSERT INTO comunas (region_id, nombre) VALUES
(2, 'Iquique'),
(2, 'Alto Hospicio'),
(2, 'Pozo Almonte'),
(2, 'Camiña'),
(2, 'Colchane'),
(2, 'Huara'),
(2, 'Pica');

-- Región 3 — Antofagasta
INSERT INTO comunas (region_id, nombre) VALUES
(3, 'Antofagasta'),
(3, 'Mejillones'),
(3, 'Sierra Gorda'),
(3, 'Taltal'),
(3, 'Calama'),
(3, 'Ollagüe'),
(3, 'San Pedro de Atacama'),
(3, 'Tocopilla'),
(3, 'María Elena');

-- Región 4 — Atacama
INSERT INTO comunas (region_id, nombre) VALUES
(4, 'Copiapó'),
(4, 'Caldera'),
(4, 'Tierra Amarilla'),
(4, 'Chañaral'),
(4, 'Diego de Almagro'),
(4, 'Vallenar'),
(4, 'Alto del Carmen'),
(4, 'Freirina'),
(4, 'Huasco');

-- Región 5 — Coquimbo
INSERT INTO comunas (region_id, nombre) VALUES
(5, 'La Serena'),
(5, 'Coquimbo'),
(5, 'Andacollo'),
(5, 'La Higuera'),
(5, 'Paihuano'),
(5, 'Vicuña'),
(5, 'Illapel'),
(5, 'Canela'),
(5, 'Los Vilos'),
(5, 'Salamanca'),
(5, 'Ovalle'),
(5, 'Combarbalá'),
(5, 'Monte Patria'),
(5, 'Punitaqui'),
(5, 'Río Hurtado');

-- Región 6 — Valparaíso
INSERT INTO comunas (region_id, nombre) VALUES
(6, 'Valparaíso'),
(6, 'Casablanca'),
(6, 'Concón'),
(6, 'Juan Fernández'),
(6, 'Puchuncaví'),
(6, 'Quintero'),
(6, 'Viña del Mar'),
(6, 'Isla de Pascua'),
(6, 'Los Andes'),
(6, 'Calle Larga'),
(6, 'Rinconada'),
(6, 'San Esteban'),
(6, 'La Ligua'),
(6, 'Cabildo'),
(6, 'Papudo'),
(6, 'Petorca'),
(6, 'Zapallar'),
(6, 'Quillota'),
(6, 'Calera'),
(6, 'Hijuelas'),
(6, 'La Cruz'),
(6, 'Nogales'),
(6, 'San Antonio'),
(6, 'Algarrobo'),
(6, 'Cartagena'),
(6, 'El Quisco'),
(6, 'El Tabo'),
(6, 'Santo Domingo'),
(6, 'San Felipe'),
(6, 'Catemu'),
(6, 'Llaillay'),
(6, 'Panquehue'),
(6, 'Putaendo'),
(6, 'Santa María'),
(6, 'Quilpué'),
(6, 'Limache'),
(6, 'Olmué'),
(6, 'Villa Alemana');

-- Región 7 — Metropolitana de Santiago
INSERT INTO comunas (region_id, nombre) VALUES
(7, 'Santiago'),
(7, 'Cerrillos'),
(7, 'Cerro Navia'),
(7, 'Conchalí'),
(7, 'El Bosque'),
(7, 'Estación Central'),
(7, 'Huechuraba'),
(7, 'Independencia'),
(7, 'La Cisterna'),
(7, 'La Florida'),
(7, 'La Granja'),
(7, 'La Pintana'),
(7, 'La Reina'),
(7, 'Las Condes'),
(7, 'Lo Barnechea'),
(7, 'Lo Espejo'),
(7, 'Lo Prado'),
(7, 'Macul'),
(7, 'Maipú'),
(7, 'Ñuñoa'),
(7, 'Pedro Aguirre Cerda'),
(7, 'Peñalolén'),
(7, 'Providencia'),
(7, 'Pudahuel'),
(7, 'Quilicura'),
(7, 'Quinta Normal'),
(7, 'Recoleta'),
(7, 'Renca'),
(7, 'San Joaquín'),
(7, 'San Miguel'),
(7, 'San Ramón'),
(7, 'Vitacura'),
(7, 'Puente Alto'),
(7, 'Pirque'),
(7, 'San José de Maipo'),
(7, 'Colina'),
(7, 'Lampa'),
(7, 'Til Til'),
(7, 'San Bernardo'),
(7, 'Buin'),
(7, 'Calera de Tango'),
(7, 'Paine'),
(7, 'Melipilla'),
(7, 'Alhué'),
(7, 'Curacaví'),
(7, 'María Pinto'),
(7, 'San Pedro'),
(7, 'Talagante'),
(7, 'El Monte'),
(7, 'Isla de Maipo'),
(7, 'Padre Hurtado'),
(7, 'Peñaflor');

-- Región 8 — O’Higgins
INSERT INTO comunas (region_id, nombre) VALUES
(8, 'Rancagua'),
(8, 'Codegua'),
(8, 'Coinco'),
(8, 'Coltauco'),
(8, 'Doñihue'),
(8, 'Graneros'),
(8, 'Las Cabras'),
(8, 'Machalí'),
(8, 'Malloa'),
(8, 'Mostazal'),
(8, 'Olivar'),
(8, 'Peumo'),
(8, 'Pichidegua'),
(8, 'Quinta de Tilcoco'),
(8, 'Rengo'),
(8, 'Requínoa'),
(8, 'San Vicente'),
(8, 'Pichilemu'),
(8, 'La Estrella'),
(8, 'Litueche'),
(8, 'Marchihue'),
(8, 'Navidad'),
(8, 'Paredones'),
(8, 'San Fernando'),
(8, 'Chépica'),
(8, 'Chimbarongo'),
(8, 'Lolol'),
(8, 'Nancagua'),
(8, 'Palmilla'),
(8, 'Peralillo'),
(8, 'Placilla'),
(8, 'Pumanque'),
(8, 'Santa Cruz');

-- Región 9 — Maule
INSERT INTO comunas (region_id, nombre) VALUES
(9, 'Talca'),
(9, 'Constitución'),
(9, 'Curepto'),
(9, 'Empedrado'),
(9, 'Maule'),
(9, 'Pelarco'),
(9, 'Pencahue'),
(9, 'Río Claro'),
(9, 'San Clemente'),
(9, 'San Rafael'),
(9, 'Cauquenes'),
(9, 'Chanco'),
(9, 'Pelluhue'),
(9, 'Curicó'),
(9, 'Hualañé'),
(9, 'Licantén'),
(9, 'Molina'),
(9, 'Rauco'),
(9, 'Romeral'),
(9, 'Sagrada Familia'),
(9, 'Teno'),
(9, 'Vichuquén'),
(9, 'Linares'),
(9, 'Colbún'),
(9, 'Longaví'),
(9, 'Parral'),
(9, 'Retiro'),
(9, 'San Javier'),
(9, 'Villa Alegre'),
(9, 'Yerbas Buenas');

-- Región 10 — Ñuble
INSERT INTO comunas (region_id, nombre) VALUES
(10, 'Chillán'),
(10, 'Chillán Viejo'),
(10, 'Quillón'),
(10, 'Bulnes'),
(10, 'San Ignacio'),
(10, 'El Carmen'),
(10, 'Pinto'),
(10, 'Pemuco'),
(10, 'Yungay'),
(10, 'Coihueco'),
(10, 'San Carlos'),
(10, 'San Nicolás'),
(10, 'Ñiquén'),
(10, 'San Fabián'),
(10, 'Ninhue'),
(10, 'Quirihue'),
(10, 'Cobquecura'),
(10, 'Trehuaco'),
(10, 'Portezuelo'),
(10, 'Ránquil'),
(10, 'Treguaco'),
(10, 'Coelemu');

-- Región 11 — Biobío
INSERT INTO comunas (region_id, nombre) VALUES
(11, 'Concepción'),
(11, 'Coronel'),
(11, 'Chiguayante'),
(11, 'Florida'),
(11, 'Hualqui'),
(11, 'Lota'),
(11, 'Penco'),
(11, 'San Pedro de la Paz'),
(11, 'Santa Juana'),
(11, 'Talcahuano'),
(11, 'Tomé'),
(11, 'Hualpén'),
(11, 'Lebu'),
(11, 'Arauco'),
(11, 'Cañete'),
(11, 'Contulmo'),
(11, 'Curanilahue'),
(11, 'Los Álamos'),
(11, 'Tirúa'),
(11, 'Los Ángeles'),
(11, 'Antuco'),
(11, 'Cabrero'),
(11, 'Laja'),
(11, 'Mulchén'),
(11, 'Nacimiento'),
(11, 'Negrete'),
(11, 'Quilaco'),
(11, 'Quilleco'),
(11, 'San Rosendo'),
(11, 'Santa Bárbara'),
(11, 'Tucapel'),
(11, 'Yumbel'),
(11, 'Alto Biobío');

-- Región 12 — La Araucanía
INSERT INTO comunas (region_id, nombre) VALUES
(12, 'Temuco'),
(12, 'Carahue'),
(12, 'Cunco'),
(12, 'Curarrehue'),
(12, 'Freire'),
(12, 'Galvarino'),
(12, 'Gorbea'),
(12, 'Lautaro'),
(12, 'Loncoche'),
(12, 'Melipeuco'),
(12, 'Nueva Imperial'),
(12, 'Padre Las Casas'),
(12, 'Perquenco'),
(12, 'Pitrufquén'),
(12, 'Pucón'),
(12, 'Saavedra'),
(12, 'Teodoro Schmidt'),
(12, 'Toltén'),
(12, 'Vilcún'),
(12, 'Villarrica'),
(12, 'Angol'),
(12, 'Collipulli'),
(12, 'Curacautín'),
(12, 'Ercilla'),
(12, 'Lonquimay'),
(12, 'Los Sauces'),
(12, 'Lumaco'),
(12, 'Purén'),
(12, 'Renaico'),
(12, 'Traiguén'),
(12, 'Victoria');

-- Región 13 — Los Ríos
INSERT INTO comunas (region_id, nombre) VALUES
(13, 'Valdivia'),
(13, 'Corral'),
(13, 'Lanco'),
(13, 'Los Lagos'),
(13, 'Máfil'),
(13, 'Mariquina'),
(13, 'Paillaco'),
(13, 'Panguipulli'),
(13, 'La Unión'),
(13, 'Futrono'),
(13, 'Lago Ranco'),
(13, 'Río Bueno');

-- Región 14 — Los Lagos
INSERT INTO comunas (region_id, nombre) VALUES
(14, 'Puerto Montt'),
(14, 'Calbuco'),
(14, 'Cochamó'),
(14, 'Fresia'),
(14, 'Frutillar'),
(14, 'Los Muermos'),
(14, 'Llanquihue'),
(14, 'Maullín'),
(14, 'Puerto Varas'),
(14, 'Castro'),
(14, 'Ancud'),
(14, 'Chonchi'),
(14, 'Curaco de Vélez'),
(14, 'Dalcahue'),
(14, 'Puqueldón'),
(14, 'Queilén'),
(14, 'Quellón'),
(14, 'Quemchi'),
(14, 'Quinchao'),
(14, 'Osorno'),
(14, 'Puerto Octay'),
(14, 'Purranque'),
(14, 'Puyehue'),
(14, 'Río Negro'),
(14, 'San Juan de la Costa'),
(14, 'San Pablo'),
(14, 'Chaitén'),
(14, 'Futaleufú'),
(14, 'Hualaihué'),
(14, 'Palena');

-- Región 15 — Aysén
INSERT INTO comunas (region_id, nombre) VALUES
(15, 'Coyhaique'),
(15, 'Lago Verde'),
(15, 'Aysén'),
(15, 'Cisnes'),
(15, 'Guaitecas'),
(15, 'Cochrane'),
(15, 'O’Higgins'),
(15, 'Tortel'),
(15, 'Chile Chico'),
(15, 'Río Ibáñez');

-- Región 16 — Magallanes y Antártica
INSERT INTO comunas (region_id, nombre) VALUES
(16, 'Punta Arenas'),
(16, 'Laguna Blanca'),
(16, 'Río Verde'),
(16, 'San Gregorio'),
(16, 'Cabo de Hornos'),
(16, 'Antártica'),
(16, 'Porvenir'),
(16, 'Primavera'),
(16, 'Timaukel'),
(16, 'Natales'),
(16, 'Torres del Paine');


-- ============================================
-- DATOS DE PRUEBA - PRODUCTOS
-- ============================================
INSERT INTO productos (nombre, descripcion, precio, img_file, stock, categoria) VALUES
('Silla Secretlab Titan', 'Silla gamer ergonómica de alta calidad', 349990.00, 'Producto2.png', 15, 'silla'),
('PlayStation 5', 'Consola de última generación', 549990.00, 'Producto1.png', 10, 'consola'),
('PC Gamer ASUS ROG Strix', 'PC de alto rendimiento para gaming', 1299990.00, 'Producto16.png', 5, 'pc'),
('Catan', 'Juego de estrategia clásico', 29990.00, 'Producto4.png', 50, 'juegos de mesa'),
('Carcassonne', 'Juego de construcción medieval', 24990.00, 'Producto5.png', 40, 'juegos de mesa'),
('Mouse Logitech G502 HERO', 'Mouse gaming de precisión', 49990.00, 'Producto7.png', 30, 'mouse'),
('Auriculares HyperX Cloud II', 'Auriculares gaming con sonido envolvente', 79990.00, 'Producto8.png', 25, 'accesorios'),
('Mousepad Razer Goliathus', 'Superficie de control óptima', 29990.00, 'Producto10.png', 60, 'mousepad'),
('Polera Personalizada Level-Up', 'Polera gamer personalizable', 14990.00, 'Producto11.png', 100, 'poleras'),
('Controlador Inalámbrico Xbox Series X', 'Control inalámbrico de nueva generación', 59990.00, 'Producto12.png', 20, 'accesorios'),
('PS5 Death Stranding 2', 'Juego exclusivo de PS5', 69990.00, 'Producto13.png', 30, 'consola'),
('Xbox Consola Serie S', 'Consola compacta y potente', 269990.00, 'Producto14.png', 12, 'consola'),
('Nintendo Switch 2', 'Nintendo Switch 2 con Mario Kart', 669990.00, 'Producto15.png', 8, 'consola');

--Luego de haber realizado los insert se ejecuta este update para que se visualicen las imagenes.
UPDATE productos SET img_file = 'Producto2.png' WHERE id = 1;
UPDATE productos SET img_file = 'Producto1.png' WHERE id = 2;
UPDATE productos SET img_file = 'Producto16.png' WHERE id = 3;
UPDATE productos SET img_file = 'Producto4.png' WHERE id = 4;
UPDATE productos SET img_file = 'Producto5.png' WHERE id = 5;
UPDATE productos SET img_file = 'Producto7.png' WHERE id = 6;
UPDATE productos SET img_file = 'Producto8.png' WHERE id = 7;
UPDATE productos SET img_file = 'Producto10.png' WHERE id = 8;
UPDATE productos SET img_file = 'Producto11.png' WHERE id = 9;
UPDATE productos SET img_file = 'Producto12.png' WHERE id = 10;
UPDATE productos SET img_file = 'Producto13.png' WHERE id = 11;
UPDATE productos SET img_file = 'Producto14.png' WHERE id = 12;
UPDATE productos SET img_file = 'Producto15.png' WHERE id = 13;