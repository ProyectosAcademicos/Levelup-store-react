import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import logo from "../../../assets/img/logo.png";
import { FaBars } from "react-icons/fa"; // ícono hamburguesa
import { useCart } from "../../../context/CartContext.jsx";



const Header = () => {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const goToHome = () => {
    navigate("/cliente");
  }

  const goToLogin = () => {
    navigate("/login");
  }

  const goToCatalogo = () => {
    navigate("/catalogo");
  }

  const goToRegister = () => {
    navigate("/register");
  }

  const gotToCarrito = () => {
    navigate("/carrito");
  }

  const goToLogout = () => {
    navigate("/home");
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
          <li><button onClick={goToHome} className={style.catalogoButton}>Inicio</button></li>
        </ul>
        <div className={style.authButtons}>
            <button onClick={goToCatalogo} className={style.catalogoButton}>Catalogo</button>
            <button onClick={gotToCarrito} className={style.cartButton}>Carrito
              {totalItems > 0 && <span className={style.cartBadge}>{totalItems}</span>}
            </button>
            {/* Agrega más botones o enlaces según sea necesario */}
        </div>
        <div className={style.authButtons}>
            <button onClick={goToLogout} className={style.logoutButton}>Cerrar Sesión</button>
        </div>
      </nav>

      {/* Fondo semitransparente al abrir menú */}
      {menuOpen && <div className={style.overlay} onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
