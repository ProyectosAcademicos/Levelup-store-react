import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CrudProductos.module.css";

const API_URL = "http://localhost:8080/api/productos";

export default function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataParaEnviar = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    try {
      if (modoEdicion && form.id) {
        await axios.put(`${API_URL}/${form.id}`, dataParaEnviar);
      } else {
        await axios.post(API_URL, dataParaEnviar);
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (err) {
      console.error("Error al guardar producto", err);
    }
  };

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

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      await cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto", err);
    }
  };

  return (
    <div className={styles.containerGP}>
      <h2>Gestión de productos</h2>

      {/* FORMULARIO */}
      <div className={styles.formContainerGP}>
        <h3>{modoEdicion ? "Editar producto" : "Crear producto"}</h3>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />

          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />

          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          />

          <label>URL Imagen</label>
          <input
            type="text"
            name="imagenUrl"
            value={form.imagenUrl}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
            />{" "}
            Activo
          </label>

          <button type="submit" className={styles.btnGuardarGP}>
            {modoEdicion ? "Actualizar" : "Crear"}
          </button>

          {modoEdicion && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className={styles.btnCancelarGP}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* TABLA */}
      <table className={styles.tablaGP}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
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
              <td className={styles.descripcionGP}>{p.descripcion}</td>
              <td>{p.categoria}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.activo ? "Sí" : "No"}</td>
              <td>
                {p.imagenUrl && (
                  <img
                    src={p.imagenUrl}
                    alt={p.nombre}
                    className={styles.imagenTablaGP}
                  />
                )}
              </td>
              <td>
                <button
                  type="button"
                  className={styles.btnEditarGP}
                  onClick={() => handleEditar(p)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={styles.btnEliminarGP}
                  onClick={() => handleEliminar(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {productos.length === 0 && (
            <tr>
              <td colSpan="9">No hay productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
