import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

export default function CrudProductos() {
  const [productos, setProductos] = useState([]);

  const [formData, setFormData] = useState({
    idProd: null,
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const [editando, setEditando] = useState(false); 


  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleDelete = async (idProd) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;
     try {
      await axios.delete(`${API_URL}/${idProd}`); // DELETE /api/productos/{id}
    // Quitar el producto del estado
     setProductos((prev) => prev.filter((p) => p.idProd !== idProd));
    } catch (err) {
    console.error(err);
    alert("Error al eliminar el producto");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const empezarEdicion = (producto) => {
   setEditando(true);
    setFormData({
     idProd: producto.idProd,
     nombre: producto.nombre,
     descripcion: producto.descripcion,
     precio: producto.precio,
    });
 };


  const handleSubmit = async (e) => {
   e.preventDefault();

   if (!formData.nombre || !formData.descripcion || !formData.precio) {
     alert("Completa todos los campos");
     return;
    }

    try {
      const productoAEnviar = {
       nombre: formData.nombre,
       descripcion: formData.descripcion,
       precio: formData.precio,
    };

    if (editando) {
      // MODO EDICIÓN: hacemos PUT
      const res = await axios.put(
        `${API_URL}/${formData.idProd}`,
        productoAEnviar
      );

      // Actualizar en el estado la fila modificada
      setProductos((prev) =>
        prev.map((p) =>
          p.idProd === formData.idProd ? res.data : p
        )
      );

      setEditando(false);
    } else {
      // MODO CREACIÓN: hacemos POST
      const res = await axios.post(API_URL, productoAEnviar);
      setProductos((prev) => [...prev, res.data]);
    }

    // Limpiar formulario al final
    setFormData({
      idProd: null,
      nombre: "",
      descripcion: "",
      precio: "",
    });
  } catch (err) {
    console.error(err);
    alert("Error al guardar el producto");
  }
};

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Ingreso de productos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Descripción: </label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Precio: </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Guardar</button>
      </form>

      {productos.length === 0 ? (
        <p>No hay productos aún.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.idProd}>
                <td>{p.idProd}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>
                  <button onClick={() => empezarEdicion(p)}>
                    Editar
                    </button>
                  <button onClick={() => handleDelete(p.idProd)}>
                    Eliminar
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
