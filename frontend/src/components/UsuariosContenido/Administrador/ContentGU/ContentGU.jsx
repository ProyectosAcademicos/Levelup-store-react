import React, { useEffect, useState } from "react";
import style from "./ContentGU.module.css";

const ContentGU = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", correo: "" });
  const [mensaje, setMensaje] = useState("");

  const fetchUsuarios = async () => {
  try {
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    const res = await fetch("http://localhost:8080/api/auth/all", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();
    setUsuarios(data);

  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    setMensaje("No se pudieron cargar los usuarios.");
  }
};


  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    setEditUser(usuario.id);
    setFormData({ nombre: usuario.nombre, correo: usuario.correo });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/auth/update/${editUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      setMensaje("Usuario actualizado correctamente.");
      setEditUser(null);
      fetchUsuarios(); // refrescar
    } catch (error) {
      setMensaje("Hubo un error al actualizar el usuario.");
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:8080/api/auth/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setMensaje("Usuario eliminado.");
      fetchUsuarios();
    } catch (error) {
      setMensaje("No se pudo eliminar el usuario.");
    }
  };


  return (
    <div className={style.containerGU}>
      <h2>Gestión de Usuarios</h2>

      {mensaje && <p className={style.mensaje}>{mensaje}</p>}

      {/* Tabla de usuarios */}
      <table className={style.tabla}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>

              <td>
                <button onClick={() => handleEdit(u)} className={style.btnEditar}>
                  Editar
                </button>

                <button onClick={() => handleDelete(u.id)} className={style.btnEliminar}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de edición */}
      {editUser && (
        <div className={style.formContainer}>
          <h3>Editar Usuario</h3>

          <form onSubmit={handleUpdate}>
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />

            <label>Correo:</label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            />

            <button type="submit" className={style.btnGuardar}>Guardar cambios</button>
            <button onClick={() => setEditUser(null)} className={style.btnCancelar}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContentGU;