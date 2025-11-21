package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.Carrito;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    
    // Buscar carrito de un usuario
    List<Carrito> findByUsuario(Usuario usuario);
    
    // Buscar un producto específico en el carrito del usuario
    Optional<Carrito> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    // Eliminar todos los items del carrito de un usuario
    void deleteByUsuario(Usuario usuario);
}