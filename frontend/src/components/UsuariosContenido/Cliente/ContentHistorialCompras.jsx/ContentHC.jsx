import React from 'react';
import style from './ContentHC.module.css';

const ContentHC = () => {
    return (
        <div className={style.contentHC}>
            <h2>Historial de Compras</h2>

            <div className={style.card}>
                <p>Aquí se mostrará el historial de compras del cliente.</p>
            </div>
        </div>
    );
};

export default ContentHC;
