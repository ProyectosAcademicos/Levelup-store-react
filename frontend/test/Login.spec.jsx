import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginContenido from "../src/components/LoginContenido/LoginContenido.jsx";

// 👉 Mock del contexto de autenticación
vi.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn()
  })
}));

// 👉 Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// 👉 Mock global de fetch
global.fetch = vi.fn();

describe("LoginContenido", () => { //agrupa tests

  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <LoginContenido />
      </MemoryRouter>
    );

  // 🔹 TEST 1: Renderiza correctamente
  it("debería renderizar el formulario de login", () => { // define un test
    renderLogin();

    expect(screen.getByText("Iniciar sesión")).toBeDefined(); //valida resultados
    expect(screen.getByPlaceholderText("name@example.com")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
  });

  // 🔹 TEST 2: Login exitoso ADMIN → debería redirigir
  it("debería permitir login exitoso y redirigir al administrador", async () => {
    // Mock de respuesta del backend
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        rol: "ADMIN",
        nombre: "Juan Admin",
      }),
    });

    renderLogin(); // muestra el componente

    fireEvent.change(screen.getByPlaceholderText("name@example.com"), { //screen permite buscar elementos
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/administrador");
    });
  });

  // 🔹 TEST 3: Login fallido (credenciales incorrectas)
  it("debería mostrar alerta en caso de error de login", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    // mock window.alert para que Vitest no falle
    vi.spyOn(window, "alert").mockImplementation(() => {});

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "badpass" },
    });

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Usuario o contraseña incorrectos."
      );
    });
  });

  // 🔹 TEST 4: "Recuérdame" guarda el email
  it("debería guardar el email en localStorage si se selecciona 'Recuérdame'", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ rol: "CLIENTE" })
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "test@correo.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByLabelText("Recuérdame"));

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(localStorage.getItem("rememberedEmail")).toBe("test@correo.com"); // valida resultados
    });
  });

});
