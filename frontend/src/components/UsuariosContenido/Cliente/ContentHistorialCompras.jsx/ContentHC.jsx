import React from 'react';
import style from './ContentHC.module.css';
import { useEffect, useState } from "react";

const ContentHC = () => {

    const [historiales, setHistoriales] = useState([]);

    // const [formData, setFormData] = useState({
    //     id: "",
    //     accion: "",
    //     fecha: "",
    //     usuario_id: "",
    // });

    useEffect(() =>{
        const fetchHistorial = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = storedUser ? JSON.parse(storedUser).token : null;


                const response = await fetch("http://localhost:8080/api/historial", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                setHistoriales(data); // GUARDAMOS LA LISTA COMPLETA


                // setFormData({
                //     id: data.id || "",
                //     accion: data.accion || "",
                //     fecha: data.fecha || "",
                //     usuario_id: data.usuario_id || ""
                // });

            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
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
                            <td>{item.accion}</td>
                            <td>{new Date(item.fecha).toLocaleString()}</td>
                            <td>{item.usuarioId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
};

export default ContentHC;
