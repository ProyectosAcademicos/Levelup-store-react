// src/components/CrudProductos.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

export default function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estado del formulario, basado en tu entidad Producto
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagenUrl: "",
    activo: true,
  });

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos", err);
    }
  };

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const limpiarFormulario = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagenUrl: "",
      activo: true,
    });
    setModoEdicion(false);
  };

  // Crear / Actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataParaEnviar = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    try {
      if (modoEdicion && form.id) {
        // PUT /api/productos/{id}
        await axios.put(`${API_URL}/${form.id}`, dataParaEnviar);
      } else {
        // POST /api/productos
        await axios.post(API_URL, dataParaEnviar);
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (err) {
      console.error("Error al guardar producto", err);
    }
  };

  // Cargar datos al formulario para editar
  const handleEditar = (prod) => {
    setForm({
      id: prod.id,
      nombre: prod.nombre || "",
      descripcion: prod.descripcion || "",
      precio: prod.precio || "",
      stock: prod.stock || "",
      categoria: prod.categoria || "",
      imagenUrl: prod.imagenUrl || "",
      activo: prod.activo ?? true,
    });
    setModoEdicion(true);
  };

  // Eliminar
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      // DELETE /api/productos/{id}
      await axios.delete(`${API_URL}/${id}`);
      await cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD de Productos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>{modoEdicion ? "Editar producto" : "Crear producto"}</h3>

        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción: </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Precio: </label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Stock: </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Categoría: </label>
          <input
            type="text"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>URL Imagen: </label>
          <input
            type="text"
            name="imagenUrl"
            value={form.imagenUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
            />
            Activo
          </label>
        </div>

        <button type="submit">
          {modoEdicion ? "Actualizar" : "Crear"}
        </button>

        {modoEdicion && (
          <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "0.5rem" }}>
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA SIMPLE */}
      <h3>Listado de productos</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Activo</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.activo ? "Sí" : "No"}</td>
              <td>
                {p.imagenUrl && (
                  <img src={p.imagenUrl} alt={p.nombre} style={{ width: "50px" }} />
                )}
              </td>
              <td>
                <button onClick={() => handleEditar(p)}>Editar</button>
                <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}

          {productos.length === 0 && (
            <tr>
              <td colSpan="8">No hay productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
