import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import logo from "../../../assets/img/logo.png";
import { FaBars } from "react-icons/fa"; // ícono hamburguesa
  import { useCart } from "../../../context/CartContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";



const HeaderCliente = () => {
  const navigate = useNavigate();
  
    const { cartItems } = useCart();
    const { user, logout } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const goToHome = () => {
    navigate("/cliente");
  }

  const goToCatalogo = () => {
    navigate("/catalogo");
  }

  const goToCarrito = () => {
    navigate("/carrito");
  }

  const goToLogout = () => {
    logout();          // ← cierra sesión REAL del contexto
    navigate("/home"); // ← redirige al home
  };


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
      
              <div className={style.authButtons}>
                {/* Si NO hay usuario → muestra login y registro */}
                {!user ? (
                  <>
                    <button onClick={goToLogin} className={style.loginButton}>
                      Iniciar Sesión
                    </button>
      
                    <button onClick={goToRegister} className={style.registerButton}>
                      Registrarse
                    </button>
                  </>
                ) : (
                  /* Si hay usuario → muestra saludo y cerrar sesión */
                  <>
                    <span className={style.userText}>
                      Hola, {user.usuario?.nombre || "Usuario"}
                    </span>
      
                    <button onClick={goToLogout} className={style.logoutButton}>
                      Cerrar sesión
                    </button>
                  </>
                )}
      
                <button onClick={goToCatalogo} className={style.catalogoButton}>
                  Catálogo
                </button>
      
                <button onClick={goToCarrito} className={style.cartButton}>
                  Carrito
                  {totalItems > 0 && (
                    <span className={style.cartBadge}>{totalItems}</span>
                  )}
                </button>
              </div>
            </nav>

      {/* Fondo semitransparente al abrir menú */}
      {menuOpen && <div className={style.overlay} onClick={toggleMenu}></div>}
    </header>
  );
};

export default HeaderCliente;
