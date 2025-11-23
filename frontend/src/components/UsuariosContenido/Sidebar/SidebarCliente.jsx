import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

const Sidebar = () => {

  const navigate = useNavigate();    
  const { user, logout } = useAuth();

  const goToLogout = () => {
    logout();                         // ← Cierra sesión real
    navigate("/home");                // ← Redirige al home
  };

  return (
    <main className="d-flex">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: "280px", height: "100vh" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg
            className="bi pe-none me-2"
            width="40"
            height="32"
            aria-hidden="true"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Sidebar</span>
        </Link>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto">

          <li className="nav-item">
            <Link to="inicio" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Inicio
            </Link>
          </li>

          <li className="nav-item">
            <Link to="datos" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Datos personales
            </Link>
          </li>

          <li>
            <Link to="historial" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#table"></use>
              </svg>
              Historial de compras
            </Link>
          </li>
        </ul>

        <hr />
      </div>
    </main>
  );
};

export default Sidebar;
