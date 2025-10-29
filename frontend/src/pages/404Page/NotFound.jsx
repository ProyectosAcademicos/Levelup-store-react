//Acá podemos alojar una pagina 404 personalizada
import React from 'react';
import style from './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className={style.title}>🕹️ ¡404! Has tomado el camino equivocado, viajero.<br>
      </br>Este nivel aún no está desbloqueado.</h1>
      <button className={style.button} onClick={() => window.location.href = '/Home'}>Volver al inicio</button>
    </div>
  );
}

export default NotFoundPage;    