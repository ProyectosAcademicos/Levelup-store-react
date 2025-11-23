import React, { useEffect, useState } from 'react';
import style from "./index.module.css";

const ContentOrd = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;
        
        const response = await fetch("http://localhost:8080/api/ordenes/mis-ordenes", {
          headers: { "Authorization": `Bearer ${token}` }
        });



        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setOrdenes(data.data); // tu ApiResponse envuelve la data
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <div className={style.containerOrd}>
      <h2 className={style.titulo}>Gestión de Órdenes</h2>

      {ordenes.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <table className={style.tablaOrd}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.usuarioNombre}</td>
                <td>${orden.total}</td>
                <td>{orden.estado}</td>
                <td>
                  <ul>
                    {orden.detalles.map(det => (
                      <li key={det.productoId}>
                        {det.productoNombre} x {det.cantidad} (${det.subtotal})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContentOrd;
