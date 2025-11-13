import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Importaciones de páginas
import HomePage from "./pages/HomePage/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./pages/404Page/NotFound.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ClienteProfile from "./pages/ClienteProfile/ClienteProfile.jsx";
import CatalogoPage from "./pages/CatalogoPage/CatalogoPage.jsx";
import CarritoPage from "./components/CarritoContenido/CarritoContenido.jsx"; // ✅ Importar CarritoPage

import Administrador from "./pages/AdminProfile/AdminProfile.jsx";
import VendedorProfile from "./pages/VendedorProfile/VendedorProfile.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ Importar CartProvider
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/carrito" element={<CarritoPage />} /> 

            {/* CLIENTE */}
            <Route
              path="/cliente/*"
              element={
                <ProtectedRoute allowedRoles={["CLIENTE"]}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* ADMINISTRADOR */}
            <Route
              path="/administrador/*"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* VENDEDOR */}
            <Route
              path="/vendedor/*"
              element={
                <ProtectedRoute allowedRoles={["VENDEDOR"]}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;