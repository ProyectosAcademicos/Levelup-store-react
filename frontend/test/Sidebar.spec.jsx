import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../src/components/UsuariosContenido/Sidebar/SidebarCliente.jsx";

const renderSidebar = () =>
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );

describe("SidebarCliente Component", () => { // agrupa tests
  
  test("renderiza el título 'Sidebar'", () => {
    renderSidebar();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  test("renderiza el enlace Inicio con ruta /inicio", () => {
    renderSidebar();
    const link = screen.getByText("Inicio");
    expect(link).toBeInTheDocument();
    expect(link.closest("a").getAttribute("href")).toBe("/inicio");
  });

  test("renderiza el enlace Datos personales", () => {
    renderSidebar();
    expect(screen.getByText("Datos personales")).toBeInTheDocument();
  });

  test("renderiza el enlace Cerrar sesión y su ruta", () => {
    renderSidebar();
    const link = screen.getByText("Cerrar sesión");
    expect(link.closest("a").getAttribute("href")).toBe("/home");
  });

  test("renderiza los 6 enlaces correctos del menú", () => {
    renderSidebar();
    const navItems = screen.getAllByRole("link");
    expect(navItems.length).toBe(7);
  });
});
