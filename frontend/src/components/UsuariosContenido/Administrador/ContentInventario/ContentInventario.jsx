import React, { useEffect, useState } from "react";
import style from './ContentInventario.module.css';


const ContentInventario = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/productos");
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className={style.containerInventario}>
            <h2>Gestión de inventario</h2>

            <table className={style.tablaInventario}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((p) => (
                    <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td className={style.descripcionInventario}>{p.descripcion}</td>
                    <td>${p.precio}</td>
                    <td>{p.stock}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

    );
};

export default ContentInventario;