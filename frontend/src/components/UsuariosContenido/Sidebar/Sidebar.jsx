import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <main className="d-flex">
      {/* Sidebar */}
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
            <Link to="datos" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#home"></use>
              </svg>
              Datos personales
            </Link>
          </li>

          <li>
            <Link to="/cliente/medios-pago" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Medios de pago
            </Link>
          </li>

          <li>
            <Link to="/cliente/pedidos" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Pedidos
            </Link>
          </li>

          <li>
            <Link to="/cliente/historial" className="nav-link text-white">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#table"></use>
              </svg>
              Historial de compras
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

        <div className="d-flex align-items-center text-white text-decoration-none">
          <strong>Usuario</strong>
        </div>
      </div>

    </main>
  );
};

export default Sidebar;
