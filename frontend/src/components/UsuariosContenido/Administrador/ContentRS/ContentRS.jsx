import React, { useState } from "react";
import style from './ContentRS.module.css';

const ContentRS = () => {
    const [mensaje, setMensaje] = useState("");

    const handleShare = (redSocial) => {
        // Aquí podrías agregar la lógica de compartir real
        setMensaje(`Contenido compartido en ${redSocial}`);
    };

    return (
        <div className={style.containerRS}>
            <h2>Compartir contenido</h2>

            <div className={style.botonesRS}>
                <button
                    className={`${style.btnRS} ${style.instagram}`}
                    onClick={() => handleShare("Instagram")}
                >
                    Instagram
                </button>

                <button
                    className={`${style.btnRS} ${style.facebook}`}
                    onClick={() => handleShare("Facebook")}
                >
                    Facebook
                </button>

                <button
                    className={`${style.btnRS} ${style.twitter}`}
                    onClick={() => handleShare("Twitter")}
                >
                    Twitter
                </button>
            </div>

            {mensaje && <p className={style.mensajeRS}>{mensaje}</p>}
        </div>
    );
};

export default ContentRS;
