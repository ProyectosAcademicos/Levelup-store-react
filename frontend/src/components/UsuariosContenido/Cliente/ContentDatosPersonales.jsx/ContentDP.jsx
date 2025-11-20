import style from "./ContentDP.module.css";
import { useEffect, useState } from "react";

const ContentDP = () => {
    
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    useEffect(() =>{
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:8080/api/usuarios/me", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setFormData({
                    nombre: data.nombre || "",
                    apellido: data.apellido || "",
                    email: data.correo || "",
                    telefono: data.telefono || "",
                    direccion: data.direccion || ""
                });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    return(
        <div className={style.contentDP}>
            <h2>Datos Personales</h2>

            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
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
                    />
                </div>

                <button type="submit" className={style.submitButton}>
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
};

export default ContentDP;
