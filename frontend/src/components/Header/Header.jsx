import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.png";
import { FaBars } from "react-icons/fa"; // ícono hamburguesa

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  }

  const goToRegister = () => {
    navigate("/register");
  }
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <img onClick={goToHome} src={logo} alt="Logo" className={style.logo} />
      </div>

      <button className={style.menuButton} onClick={toggleMenu}>
        <FaBars size={24} />
      </button>

      {/* Menú lateral */}
      <nav className={`${style.sideMenu} ${menuOpen ? style.active : ""}`}>
        <ul>
          <li><a href="home">Inicio</a></li>
          <li><a href="productos">Productos</a></li>
          <li><a href="contacto">Contacto</a></li>
        </ul>
        <div className={style.authButtons}>
            <button className={style.loginButton}>Iniciar Sesión</button>
            <button onClick={goToRegister} className={style.registerButton}>Registrarse</button>
            <button className={style.cartButton}>Carrito</button>
        </div>
      </nav>

      {/* Fondo semitransparente al abrir menú */}
      {menuOpen && <div className={style.overlay} onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
