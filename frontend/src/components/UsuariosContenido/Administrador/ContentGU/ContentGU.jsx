import React from "react";
import style from "./ContentGU.module.css";

const ContentGU = () => {
  return (
    <div className={style.containerGU}>
      <h2 className={style}>Gestión de Usuarios</h2>
      <p>Aquí se podrá gestionarlos usuarios del sistema.</p>
    </div>
  );
}

export default ContentGU;