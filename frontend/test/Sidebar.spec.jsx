import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../src/components/UsuariosContenido/Sidebar/SidebarCliente.jsx";

// Mock del AuthContext
vi.mock("../src/context/AuthContext.jsx", () => ({
  useAuth: () => ({
    user: { nombre: "Test User" },
    logout: vi.fn(),
  }),
}));

describe("Sidebar component", () => {
  const renderSidebar = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

  it("renderiza correctamente el título Sidebar", () => {
    renderSidebar();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  it("renderiza el link Inicio", () => {
    renderSidebar();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  it("renderiza el link Datos personales", () => {
    renderSidebar();
    expect(screen.getByText("Datos personales")).toBeInTheDocument();
  });

  it("renderiza el link Historial de compras", () => {
    renderSidebar();
    expect(screen.getByText("Historial de compras")).toBeInTheDocument();
  });
});
