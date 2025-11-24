import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas públicas
import HomePage from "./pages/HomePage/HomePage.jsx";
import HomeCliente from "./pages/HomePage/HomeCliente/index.jsx";
import HomePageAdmin from "./pages/HomePage/HomePageAdmin/index.jsx";
import AdministradorProfile from "./pages/AdminProfile/AdminProfile.jsx";
import VendedorProfile from "./pages/VendedorProfile/VendedorProfile.jsx";
import HomePageVendedor from "./pages/HomePage/HomePageVendedor/index.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./pages/404Page/NotFound.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import CatalogoPage from "./pages/CatalogoPage/CatalogoPage.jsx";
import CrudProductos from "./components/CrudProductos/CrudProductos.jsx";

import CarritoPage from "./pages/CarritoPage/CarritoPage.jsx";
import ContentGP from "./components/UsuariosContenido/Administrador/ContentGP/ContentGP.jsx";
import ContentIV from "./components/UsuariosContenido/Administrador/ContentInventario/ContentInventario.jsx";
import ContentRS from "./components/UsuariosContenido/Administrador/ContentRS/ContentRS.jsx";
import DetalleP from "./pages/AdminProfile/DetallePerfil.jsx";
import ContentIvVend from "./components/UsuariosContenido/Vendedor/ContentIvVend/index.jsx";
import ContentOrdenes from "./components/UsuariosContenido/Vendedor/ContentOrdenes/index.jsx";
import DetallePerfilV from "./components/UsuariosContenido/Vendedor/ContentPerfil/index.jsx";
import PerfilCliente from "./pages/ClienteProfile/ClienteProfile.jsx";
import DatosCliente from "./components/UsuariosContenido/Cliente/ContentDatosPersonales.jsx/ContentDP.jsx";
import MediosPago from "./components/UsuariosContenido/Cliente/ContentMP/ContentMP.jsx";
import PedidosCliente from "./components/UsuariosContenido/Cliente/ContentHistorialCompras.jsx/ContentHC.jsx";
import HistorialCliente from "./components/UsuariosContenido/Cliente/ContentHistorialCompras.jsx/ContentHC.jsx";
import ContentGU from "./components/UsuariosContenido/Administrador/ContentGU/ContentGU.jsx";
import CheckoutContenido from "./components/CheckoutContenido/CheckoutContenido.jsx";


import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/" element={<HomePage />} />       {/* landing */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/checkout" element={<CheckoutContenido />} />


            {/* CRUD (puede ser pública o protegida, según lo que quieran) */}
            <Route path="/crud-productos" element={<CrudProductos />} />

            {/* CLIENTE - LAYOUT PROTEGIDO */}
            <Route
              path="/cliente"
              element={
                <ProtectedRoute allowedRoles={["CLIENTE"]}>
                  <PerfilCliente /> {/* Sidebar + Outlet */}
                </ProtectedRoute>
              }
            >
              <Route index element={<HomeCliente />} />
              <Route path="inicio" element={<HomeCliente />} />
              <Route path="perfil" element={<PerfilCliente />} />
              <Route path="datos" element={<DatosCliente />} />
              <Route path="medios-pago" element={<MediosPago />} />
              <Route path="pedidos" element={<PedidosCliente />} />
              <Route path="historial" element={<HistorialCliente />} />
            </Route>

            {/* ADMINISTRADOR - LAYOUT PROTEGIDO */}
            <Route
              path="/administrador"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdministradorProfile /> {/* Sidebar + Outlet */}
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePageAdmin />} />
              <Route path="inicio" element={<HomePageAdmin />} />
              <Route path="perfil" element={<DetalleP />} />
              <Route path="usuarios" element={<ContentGU />} />
              <Route path="productos" element={<ContentGP />} />
              <Route path="inventario" element={<ContentIV />} />
              <Route path="compartir" element={<ContentRS />} />
            </Route>

            {/* VENDEDOR - LAYOUT PROTEGIDO */}
            <Route
              path="/vendedor"
              element={
                <ProtectedRoute allowedRoles={["VENDEDOR"]}>
                  <VendedorProfile /> {/* Sidebar + Outlet */}
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePageVendedor />} />
              <Route path="inicio" element={<HomePageVendedor />} />
              <Route path="perfil" element={<DetallePerfilV />} />
              <Route path="ordenesv" element={<ContentOrdenes />} />
              <Route path="inventariov" element={<ContentIvVend />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
