// //Aquí se guarda la lógica de comunicación con el backend o APIs externas - axios.

// // import axios from "axios";

// // const API_URL = "http://localhost:8080/api/auth";

// // export const loginUser = async (credentials) => {
// //   const res = await axios.post(`${API_URL}/login`, credentials);
// //   return res.data;
// // };

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// ============= Configuración de headers con token =============
const configAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// ============= AUTENTICACIÓN =============
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};

// ============= PRODUCTOS =============
export const getProductos = async () => {
  const res = await axios.get(`${API_URL}/productos`);
  return res.data;
};

export const getProductosPorCategoria = async (categoria) => {
  const res = await axios.get(`${API_URL}/productos/categoria/${categoria}`);
  return res.data;
};

export const buscarProductos = async (nombre) => {
  const res = await axios.get(`${API_URL}/productos/buscar`, { params: { nombre } });
  return res.data;
};

// ============= CARRITO =============
export const obtenerCarrito = async (token) => {
  if (!token) throw new Error("Token no proporcionado");
  const res = await axios.get(`${API_URL}/carrito`, configAuth(token));
  return res.data;
};

export const agregarAlCarrito = async (token, productoId, cantidad = 1) => {
  if (!token) throw new Error("Token no proporcionado");
  if (!productoId || cantidad <= 0) throw new Error("Datos de carrito inválidos");
  const res = await axios.post(`${API_URL}/carrito/agregar`, { productoId, cantidad }, configAuth(token));
  return res.data;
};

export const actualizarCantidadCarrito = async (token, itemId, cantidad) => {
  if (!token) throw new Error("Token no proporcionado");
  if (!itemId || cantidad <= 0) throw new Error("Datos inválidos");
  const res = await axios.put(`${API_URL}/carrito/${itemId}`, { cantidad }, configAuth(token));
  return res.data;
};

export const eliminarDelCarrito = async (token, itemId) => {
  if (!token) throw new Error("Token no proporcionado");
  if (!itemId) throw new Error("ID de item inválido");
  const res = await axios.delete(`${API_URL}/carrito/${itemId}`, configAuth(token));
  return res.data;
};

export const limpiarCarrito = async (token) => {
  if (!token) throw new Error("Token no proporcionado");
  const res = await axios.delete(`${API_URL}/carrito`, configAuth(token));
  return res.data;
};

// ============= ÓRDENES =============
export const crearOrden = async (token, ordenData) => {
  if (!token) throw new Error("Token no proporcionado");
  const res = await axios.post(`${API_URL}/ordenes/crear`, ordenData, configAuth(token));
  return res.data;
};

export const obtenerMisOrdenes = async (token) => {
  if (!token) throw new Error("Token no proporcionado");
  const res = await axios.get(`${API_URL}/ordenes/mis-ordenes`, configAuth(token));
  return res.data;
};

export const obtenerOrden = async (token, ordenId) => {
  if (!token || !ordenId) throw new Error("Datos inválidos");
  const res = await axios.get(`${API_URL}/ordenes/${ordenId}`, configAuth(token));
  return res.data;
};

// ============= CHECKOUT =============
export const checkout = async (token, ordenData) => {
  if (!token) throw new Error("Token no proporcionado");
  const res = await axios.post(`${API_URL}/ordenes/checkout`, ordenData, configAuth(token));
  return res.data;
};


// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// // ============= AUTENTICACIÓN =============
// export const loginUser = async (credentials) => {
//   const res = await axios.post(`${API_URL}/auth/login`, credentials);
//   return res.data;
// };

// export const registerUser = async (userData) => {
//   const res = await axios.post(`${API_URL}/auth/register`, userData);
//   return res.data;
// };

// // ============= PRODUCTOS =============
// export const getProductos = async () => {
//   const res = await axios.get(`${API_URL}/productos`);
//   return res.data;
// };

// export const getProductosPorCategoria = async (categoria) => {
//   const res = await axios.get(`${API_URL}/productos/categoria/${categoria}`);
//   return res.data;
// };

// export const buscarProductos = async (nombre) => {
//   const res = await axios.get(`${API_URL}/productos/buscar`, {
//     params: { nombre }
//   });
//   return res.data;
// };

// // ============= CARRITO =============
// export const obtenerCarrito = async (token) => {
//   const res = await axios.get(`${API_URL}/carrito`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return res.data;
// };

// export const agregarAlCarrito = async (token, productoId, cantidad) => {
//   const res = await axios.post(
//     `${API_URL}/carrito/agregar`,
//     { productoId, cantidad },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// export const actualizarCantidadCarrito = async (token, itemId, cantidad) => {
//   const res = await axios.put(
//     `${API_URL}/carrito/${itemId}`,
//     { cantidad },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// export const eliminarDelCarrito = async (token, itemId) => {
//   const res = await axios.delete(
//     `${API_URL}/carrito/${itemId}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// export const limpiarCarrito = async (token) => {
//   const res = await axios.delete(
//     `${API_URL}/carrito`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// // ============= ÓRDENES =============
// export const crearOrden = async (token, ordenData) => {
//   const res = await axios.post(
//     `${API_URL}/ordenes/crear`,
//     ordenData,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// export const obtenerMisOrdenes = async (token) => {
//   const res = await axios.get(
//     `${API_URL}/ordenes/mis-ordenes`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// export const obtenerOrden = async (token, ordenId) => {
//   const res = await axios.get(
//     `${API_URL}/ordenes/${ordenId}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };