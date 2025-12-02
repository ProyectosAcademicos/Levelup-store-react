import React from 'react';
import style from './ContentHC.module.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../../../config/api.js";

const ContentHC = () => {

    const [historiales, setHistoriales] = useState([]);

    // const [formData, setFormData] = useState({
    //     id: "",
    //     accion: "",
    //     fecha: "",
    //     usuario_id: "",
    // });

useEffect(() => {
    const fetchHistorial = async () => {
        try {
            const storedUser = localStorage.getItem("user");
            const token = storedUser ? JSON.parse(storedUser).token : null;

            const response = await fetch(`${API_URL}/api/historial`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log("Historial recibido:", result);

            setHistoriales(result);

        } catch (error) {
            console.error("Error al obtener el historial:", error);
        }
    };

    fetchHistorial();
}, []);



    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Datos enviados:", formData);
    // };

    return(
        <div className={style.contentHC}>
            <h2>Historial de compras</h2>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {historiales.map((item) => (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.estado}</td>
                        <td>{new Date(item.creadoEn).toLocaleString()}</td>
                        <td>{item.usuarioNombre}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

    )
};

export default ContentHC;
