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

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cliente" element={<ClienteProfile />}>
          <Route path="datos" element={<DatosPersonales />} />
          <Route path="medios-pago" element={<MediosPago />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="historial" element={<HistorialCompras />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
