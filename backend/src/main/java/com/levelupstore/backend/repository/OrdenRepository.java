package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.Orden;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.model.EstadoOrden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    
    // Buscar órdenes de un usuario (ordenadas por fecha más reciente)
    List<Orden> findByUsuarioOrderByCreadoEnDesc(Usuario usuario);
    
    // Buscar órdenes por estado
    List<Orden> findByEstado(EstadoOrden estado);
    
    // Buscar órdenes de un usuario por estado
    List<Orden> findByUsuarioAndEstado(Usuario usuario, EstadoOrden estado);
}
