import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage.jsx";

// 🛠️ MOCK para evitar que el Header falle por useCart()
vi.mock("../src/context/CartContext", () => ({
  useCart: () => ({
    cartItems: [], // evita el error
  }),
}));

const renderRegister = () =>
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

describe("RegisterPage Component", () => {
  test("renderiza el título 'Registro de Usuario'", () => {
    renderRegister();
    expect(screen.getByText("Registro de Usuario")).toBeInTheDocument();
  });

  test("renderiza el campo RUT", () => {
    renderRegister();
    expect(screen.getByLabelText("RUT")).toBeInTheDocument();
  });

  test("renderiza el campo Nombre", () => {
    renderRegister();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  });

  test("renderiza el campo Apellido", () => {
    renderRegister();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
  });

  test("renderiza el campo Correo", () => {
    renderRegister();
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });

  test("renderiza el campo Contraseña", () => {
    renderRegister();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  test("renderiza el botón 'Registrarse'", () => {
  renderRegister();
  const botones = screen.getAllByRole("button", { name: "Registrarse" });
  // El botón del formulario es el que tiene type="submit"
  const botonFormulario = botones.find(btn => btn.type === "submit");
  expect(botonFormulario).toBeInTheDocument();
});

});
