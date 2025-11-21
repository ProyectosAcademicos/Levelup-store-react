import { useEffect, useState } from "react";
import axios from "axios";

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState("todos");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/productos")
            .then((response) => {
                setProductos(response.data);
            })
            .catch((err) => console.error("Error al obtener productos:", err));
    }, []);

    const productosFiltrados =
        categoria === "todos"
            ? productos
            : productos.filter((p) => p.categoria === categoria);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Productos</h2>

            {/* FILTRO */}
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                style={{ padding: "10px", marginBottom: "20px" }}
            >
                <option value="todos">Todas las categorías</option>
                <option value="silla">Sillas</option>
                <option value="consola">Consolas</option>
                <option value="pc">PC</option>
                <option value="juegos de mesa">Juegos de Mesa</option>
                <option value="mouse">Mouse</option>
                <option value="accesorios">Accesorios</option>
                <option value="mousepad">Mousepad</option>
                <option value="poleras">Poleras</option>
            </select>

            {/* GRID DE PRODUCTOS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                    gap: "20px",
                }}
            >
                {productosFiltrados.map((prod) => (
                    <div
                        key={prod.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={`/img/${prod.img_file || prod.imagenFile}`}
                            alt={prod.nombre}
                            style={{ width: "100%", height: "180px", objectFit: "contain" }}
                        />
                        <h3>{prod.nombre}</h3>
                        <p>{prod.descripcion}</p>
                        <p><strong>${prod.precio}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosList;
