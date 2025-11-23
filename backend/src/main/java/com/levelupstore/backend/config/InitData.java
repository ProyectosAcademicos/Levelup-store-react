// src/main/java/com/levelupstore/backend/config/InitData.java
package com.levelupstore.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.levelupstore.backend.repository.ProductoRepository;
import com.levelupstore.backend.model.Producto;
import java.util.List;

@Component
public class InitData implements CommandLineRunner {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public void run(String... args) throws Exception {
        // Buscar todos los productos
        List<Producto> productos = productoRepository.findAll();

        // Marcar todos como activos
        for (Producto p : productos) {
            p.setActivo(true);
        }

        // Guardar los cambios
        productoRepository.saveAll(productos);

        System.out.println("Se activaron todos los productos al iniciar la app.");
    }
}
