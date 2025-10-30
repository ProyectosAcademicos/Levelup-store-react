package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.Usuario; // Importa el modelo
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // Importante para manejar valores nulos

@Repository // Le dice a Spring que esta es una interfaz de Repositorio
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Al extender JpaRepository, Spring nos regala automáticamente
    // métodos como:
    // - save(usuario) -> Guardar o actualizar un usuario
    // - findById(id) -> Buscar un usuario por su ID
    // - findAll() -> Buscar todos los usuarios
    // - deleteById(id) -> Borrar un usuario por su ID

    // --- Métodos Personalizados ---
    // Podemos crear métodos de búsqueda simplemente nombrándolos 
    // de forma específica. Spring "entiende" el nombre y crea la consulta.

    /**
     * Busca un usuario por su correo electrónico.
     * Usamos Optional<> porque el usuario podría no existir.
     */
    Optional<Usuario> findByCorreo(String correo);

    /**
     * Busca un usuario por su RUT.
     */
    Optional<Usuario> findByRut(String rut);
}