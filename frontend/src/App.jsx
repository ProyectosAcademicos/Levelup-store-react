import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Importación global de Bootstrap
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Importaciones de páginas
import HomePage from "./pages/HomePage/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./pages/404Page/NotFound.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ClienteProfile from "./pages/ClienteProfile/ClienteProfile.jsx";
import DatosPersonales from "./pages/ClienteProfile/DatosPersonales.jsx";
import MediosPago from "./pages/ClienteProfile/MediosPago.jsx";
import Pedidos from "./pages/ClienteProfile/Pedidos.jsx";
import HistorialCompras from "./pages/ClienteProfile/HistorialCompras.jsx";


import Administrador from "./pages/AdminProfile/AdminProfile.jsx"
import GestionInventario from "./pages/AdminProfile/GestionInventario.jsx"
import GestionProductos from "./pages/AdminProfile/GestionProductos.jsx"
import CompartirContenido from "./pages/AdminProfile/CompartirContenido.jsx";
import GestionUsuario from "./pages/AdminProfile/GestionUsuario.jsx";

import VendedorProfile from "./pages/VendedorProfile/VendedorProfile.jsx";
import OrdenesVendedor from "./pages/VendedorProfile/GestionOrdenesV.jsx";
import InventarioVendedor from "./pages/VendedorProfile/GestionInventarioV.jsx";

import {AuthProvider}  from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* CLIENTE */}
          <Route
            path="/cliente/*"
            element={
              <ProtectedRoute allowedRoles={["CLIENTE"]}>
                <ClienteProfile />
              </ProtectedRoute>
            }
          />

          {/* ADMINISTRADOR */}
          <Route
            path="/administrador/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Administrador />
              </ProtectedRoute>
            }
          />

          {/* VENDEDOR */}
          <Route
            path="/vendedor/*"
            element={
              <ProtectedRoute allowedRoles={["VENDEDOR"]}>
                <VendedorProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
