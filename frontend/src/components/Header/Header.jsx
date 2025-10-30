import React from "react";
import style from './Header.module.css';
import logo from '../../assets/img/logo.png';

const Header = () => {
    return (
        <nav className={`navbar navbar-expand-md navbar-dark bg-dark ${style.header}`}>
            <div className="container-fluid">
                <a href="/">
                    <img width="40" height="40" src={logo} alt="Logo" />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-3">
                        <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/catalogo">Catálogo</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/nosotros">Nosotros</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/blog">Blog</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/contacto">Contacto</a></li>
                    </ul>

                    <form className="d-flex barra-btn-buscador" role="search">
                        <input className="form-control barra-placeholder" type="search" placeholder="Escriba aquí" aria-label="Buscar" />
                        <button className="btn btn-outline-success btn-buscador" type="submit">Buscar</button>
                    </form>

                    <div className={style.botonesHeader}>
                        <button className="btn btn-outline-light d-flex align-items-center ms-3">
                            <i className="bi bi-cart-fill me-2"></i> Carrito
                        </button>
                        <a href="/register">
                            <button className="btn btn-outline-light ms-3">Registrarse</button>
                        </a>
                        <a href="/login">
                            <button className="btn btn-outline-light ms-3">Iniciar Sesión</button>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
