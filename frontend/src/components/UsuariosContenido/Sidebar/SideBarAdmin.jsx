import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <main className="d-flex">
      {/* Sidebar */}
      <div
        className="d-flex flex-column justify-content-center flex-shrink-0 p-3 text-bg-dark"
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
          <span className="fs-4">Herramientas</span>
        </Link>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto d-flex gap-2">
          <li>
            <Link to="inicio" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Inicio
            </Link>
          </li>
          {/* <li>
            <Link to="perfil" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Perfil
            </Link>
          </li> */}
          <li>
            <Link to="usuarios" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Usuarios
            </Link>
          </li>
          <li>
            <Link to="productos" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Productos
            </Link>
          </li>

          <li>
            <Link to="inventario" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              inventario
            </Link>
          </li>

          <li>
            <Link to="compartir" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#table"></use>
              </svg>
              Compartir
            </Link>
          </li>

          <li>
            <Link to="/home" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#grid"></use>
              </svg>
              Cerrar sesión
            </Link>
          </li>
        </ul>

        <hr />
      </div>

    </main>
  );
};

export default Sidebar;
