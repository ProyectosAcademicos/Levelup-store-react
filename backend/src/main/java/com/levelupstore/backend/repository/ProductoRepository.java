package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar todos los productos activos
    List<Producto> findByActivoTrue();
    
    // Buscar por categoría y activo
    List<Producto> findByCategoriaAndActivoTrue(String categoria);
    
    // Buscar por nombre (búsqueda)
    List<Producto> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);
    
    // Buscar productos con stock disponible
    List<Producto> findByStockGreaterThanAndActivoTrue(Integer stock);
}