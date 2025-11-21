package com.levelupstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.levelupstore.backend.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    // Por ahora no hace falta agregar nada extra.
}

//Integer → porque el tipo de idProd es Integer.