import React from "react";
import style from './Header.module.css';
import logo from '../../public/img/logo.png';

const Header = () => {
    return (
        <header>
            <img className={style.logo} src={logo} alt="Logo" />
            <h1 className={style.title}>Este es el header...en desarrollo</h1>
            <button className={style.button}>Iniciar Sesión</button>
            <button className={style.button}>Registrarse</button>
        </header>
        
    );
}

export default Header;