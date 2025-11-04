import React from 'react';
import style from './ContentHC.module.css';

const ContentHC = () => {
    return (
        <div className={style.contentDP}>
            <h2>Historial de Compras</h2>
            <p>Aquí se mostrará el historial de compras del cliente.</p>
        </div>
    );
};

export default ContentHC;
