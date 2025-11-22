package com.levelupstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.levelupstore.backend.dto.ProductoDTO;
import com.levelupstore.backend.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    /**
     * GET /api/productos
     * Listar todos los productos activos
     */
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> listarProductos() {
        List<ProductoDTO> productos = productoService.listarProductos();
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/{id}
     * Obtener producto por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {
        return productoService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET /api/productos/categoria/{categoria}
     * Filtrar productos por categoría
     */
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDTO>> productosPorCategoria(@PathVariable String categoria) {
        List<ProductoDTO> productos = productoService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/buscar?nombre=xxx
     * Buscar productos por nombre
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarPorNombre(@RequestParam String nombre) {
        List<ProductoDTO> productos = productoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }
}