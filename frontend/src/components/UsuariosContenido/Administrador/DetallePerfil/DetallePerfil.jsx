import React, { useEffect, useState } from 'react';
import style from './DetallePerfil.module.css';

const DetallePerfil = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = storedUser ? JSON.parse(storedUser).token : null;

                const response = await fetch("http://18.233.237.152:8080/api/auth/me", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Error ${response.status}: ${text}`);
                }

                const contentType = response.headers.get("content-type");

                // const data = await response.json().catch(() => {
                //     throw new Error("Respuesta vacía del servidor");
                // });

                
                if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                // SIGUE NORMAL
                setFormData({
                    nombre: data.nombre || "",
                    apellido: data.apellido || "",
                    email: data.correo || "",
                    telefono: data.telefono || "",
                    direccion: data.direccion || ""
                });
            } else {
                throw new Error("El servidor no devolvió JSON");
            }


            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={style.contentDP}>
            <h2>Datos Personales</h2>

            <form className={style.form}>
                <div className={style.formGroup}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="apellido">Apellido:</label>
                    <input 
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input 
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="direccion">Dirección:</label>
                    <input 
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
};

export default DetallePerfil;
