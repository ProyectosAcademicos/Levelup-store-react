import React, { useEffect, useState } from "react";
import style from './ContentGP.module.css';

const ContentGP = () => {

  const storedUser = localStorage.getItem("user");
  const token = storedUser ? JSON.parse(storedUser).token : null;

  const [productos, setProductos] = useState([]);
  const [editProducto, setEditProducto] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
  });

  const [mensaje, setMensaje] = useState("");

  // ============================
  // GET 
  // ============================
  const fetchProductos = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/productos", {
      headers: { 
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
      }
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    setProductos(data);

  } catch (error) {
    console.error("Error al obtener productos:", error);
    setMensaje("No se pudieron cargar los productos.");
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  // ============================
  // CREAR PRODUCTO (POST)
  // ============================
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      setMensaje("Producto creado correctamente.");
      setFormData({ nombre: "", precio: 0, stock: 0 });
      fetchProductos();

    } catch (error) {
      setMensaje("No se pudo crear el producto.");
    }
  };

  // ============================
  // EDITAR 
  // ============================
  const handleEdit = (producto) => {
    setEditProducto(producto.id);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  // ============================
  // PUT (Actualizar)
  // ============================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://18.233.237.152:8080/api/productos/${editProducto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      setMensaje("Producto actualizado correctamente.");
      setEditProducto(null);
      fetchProductos();

    } catch (error) {
      setMensaje("Hubo un error al actualizar el producto.");
    }
  };

  // ============================
  // DELETE 
  // ============================
  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://18.233.237.152:8080/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setMensaje("Producto eliminado.");
      fetchProductos();

    } catch (error) {
      setMensaje("No se pudo eliminar el producto.");
    }
  };


  return (
    <div className={style.containerGP}>
      <h2>Gestión de Productos</h2>

      {mensaje && <p className={style.mensajeGP}>{mensaje}</p>}

      {/* FORMULARIO CREAR */}
      <div className={style.formContainerGP}>
        <h3>Crear Producto</h3>

        <form onSubmit={handleCreate}>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />

          <label>Precio:</label>
          <input
            type="number"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
          />

          <label>Stock:</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />

          <button type="submit" className={style.btnGuardarGP}>
            Crear Producto
          </button>
        </form>
      </div>

      {/* Tabla de productos */}
      <table className={style.tablaGP}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              {/* IMAGEN */}
              <td>
                {p.imagenUrl ? (
                  <img src={p.imagenUrl} className={style.imagenTablaGP} />
                ) : (
                  "Sin imagen"
                )}
              </td>

              <td>{p.nombre}</td>
              <td className={style.descripcionGP}>{p.descripcion}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>

              <td>{p.activo ? "Sí" : "No"}</td>

              <td>
                <button onClick={() => handleEdit(p)} className={style.btnEditar}>
                  Editar
                </button>

                <button onClick={() => handleDelete(p.id)} className={style.btnEliminar}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* FORMULARIO EDITAR */}
      {editProducto && (
        <div className={style.formContainerGP}>
          <h3>Editar Producto</h3>

          <form onSubmit={handleUpdate}>
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />

            <label>Precio:</label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            />

            <label>Stock:</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />

            <button type="submit" className={style.btnGuardarGP}>
              Guardar cambios
            </button>

            <button type="button" onClick={() => setEditProducto(null)} className={style.btnCancelarGP}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContentGP;
