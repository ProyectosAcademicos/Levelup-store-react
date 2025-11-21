import React, { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const loginUser = async ({ email, password }) => { //llamada al backend
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),

    
  })
  console.log("Cuerpo de la solicitud:", JSON.stringify({ email, password }));;

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return await response.json();
};


const LoginContenido = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);

  // Recuperar email recordado (si existe)
  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) setForm((f) => ({ ...f, email: remembered, remember: true }));
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = form;

    if (!email.trim()) return alert("Por favor, ingresa tu correo electrónico.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return alert("Por favor, ingresa un correo válido.");
    if (!password.trim()) return alert("Por favor, ingresa tu contraseña.");

    if (remember) localStorage.setItem("rememberedEmail", email.trim());
    else localStorage.removeItem("rememberedEmail");

    try {
    setLoading(true);

    // 🔹 Llamada real al backend
    const userData = await loginUser({
      email: email,
      password: password
    });


    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify({
      token: userData.token,
      rol: userData.usuario.rol,
      usuario: userData.usuario
    }));


    // 🔹 Guardar en contexto global
    login({
      token: userData.token,
      usuario: userData.usuario
    });

      console.log("Respuesta backend:", userData);
      console.log("Token recibido:", userData.token);
    
    const rol = userData.usuario.rol;

    // 🔹 Redirigir según el rol recibido desde el backend
    if (rol === "ADMIN") navigate("/administrador");
    else if (rol === "VENDEDOR") navigate("/vendedor");
    else navigate("/cliente");

    alert(`Inicio de sesión exitoso`);
  } catch (err) {
    console.error(err);
    alert("Usuario o contraseña incorrectos.");
  } finally {
    setLoading(false);
  }


  };

  const irHome = () => navigate("/home");

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <main className="form-signin m-auto" style={{ maxWidth: 330, width: "100%" }}>
        <form onSubmit={onSubmit}>
          <img
            className="mb-4 d-block mx-auto"
            src={logo}
            alt="Logo"
            width="92"
            height="77"
          />
          <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
            <label htmlFor="floatingInput">Correo electrónico</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkDefault"
              name="remember"
              checked={form.remember}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="checkDefault">
              Recuérdame
            </label>
          </div>

          <button
            className="btn btn-primary w-100 py-2 mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <button
            type="button"
            className="btn btn-outline-primary w-100 py-2 mb-3"
            onClick={irHome}
          >
            Volver al home
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginContenido;
