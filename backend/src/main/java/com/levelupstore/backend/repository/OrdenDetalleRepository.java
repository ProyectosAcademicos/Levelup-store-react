package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.OrdenDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenDetalleRepository extends JpaRepository<OrdenDetalle, Long> {
}