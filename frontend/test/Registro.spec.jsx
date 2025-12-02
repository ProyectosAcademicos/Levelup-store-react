import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// 🚫 Mock completo de axios (evita llamadas reales al backend)
vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: vi.fn().mockResolvedValue({ data: [] }),
      post: vi.fn().mockResolvedValue({ data: {} }),
    }),
  },
}));

// 🚫 Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// IMPORTA TU COMPONENTE (Ajusta la ruta según tu estructura)
import RegisterPage from "../src/components/RegisterContenido.jsx/RegisterContenido.jsx";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Renderizado del componente RegisterPage", () => {
  it("renderiza el título principal", () => {
    render(<RegisterPage />);
    expect(
      screen.getByText("Registro de Usuario")
    ).toBeInTheDocument();
  });

  it("renderiza todos los campos del formulario", () => {
    render(<RegisterPage />);

    // Inputs y selects
    expect(screen.getByLabelText("RUT")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono (opcional)")).toBeInTheDocument();
    expect(screen.getByLabelText("Dirección")).toBeInTheDocument();
    expect(screen.getByLabelText("Región")).toBeInTheDocument();
    expect(screen.getByLabelText("Comuna")).toBeInTheDocument();
  });

  it("renderiza el botón de registro", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
  });

  it("renderiza el formulario sin errores iniciales", () => {
    render(<RegisterPage />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renderiza correctamente el contenedor principal", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Registro de Usuario").closest("div")).toBeTruthy();
  });
});
