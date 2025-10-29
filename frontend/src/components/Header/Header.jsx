import React from "react";
import style from './Header.module.css';
import logo from '../../assets/img/logo.png';

const Header = () => {
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container-fluid">
                <a href="../html/home.html">
                    <img width="40" height="40" src={logo} alt="Logo" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="menu-hamburguesa collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0 gap-3">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../html/home.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="../html/catalogo.html">Catalogo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="../html/nosotros.html">Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="../html/blog.html">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Contacto</a>
                        </li>
                        {/* <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>  */}
                    </ul>

                    <form class="barra-btn-buscador d-flex" role="search">
                        <input class="barra-placeholder form-control" type="search" placeholder="Escriba aquí" aria-label="Buscar" />
                        <button class="btn-buscador btn btn-outline-success" type="submit">
                            Buscar
                        </button>
                    </form>
                    <div className={style.botonesHeader}>
                        {/* Botón Carrito */}
                        <button class="btn-carrito btn btn-outline-light d-flex align-items-center ms-3" type="button"
                            data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas" aria-controls="carritoOffcanvas">
                            <i class="bi bi-cart-fill me-2"></i> Carrito
                        </button>
                        {/* Botón Registrarse */}
                        <a href="/register">
                            <button class="boton-registrarse btn btn-outline-light d-flex align-items-center ms-3" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#inicioOffcanvas"
                                aria-controls="inicioOffcanvas">
                                Registrarse
                            </button>
                        </a>
                        {/* Botón Iniciar Sesión */}
                        <a href="../html/login.html">
                            <button class="boton-iniciar-sesion btn btn-outline-light d-flex align-items-center ms-3" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#inicioOffcanvas"
                                aria-controls="inicioOffcanvas">
                                Iniciar Sesión
                            </button>
                        </a>
                    </div>


                </div>
            </div>
        </nav>

    );
}

export default Header;