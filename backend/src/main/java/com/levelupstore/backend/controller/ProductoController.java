package com.levelupstore.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelupstore.backend.model.Producto;
import com.levelupstore.backend.repository.ProductoRepository;

@RestController
@RequestMapping("/api/productos") //le dice a Spring que este archivo maneja requests HTTP.
@CrossOrigin(origins = "*")  // Permite que React acceda sin problemas
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // GET - Listar todos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // GET - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Integer id) {
        Optional<Producto> producto = productoRepository.findById(id);

        return producto
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - Crear producto
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT - Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Integer id,
            @RequestBody Producto datosActualizados) {

        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(datosActualizados.getNombre());
                    producto.setDescripcion(datosActualizados.getDescripcion());
                    producto.setPrecio(datosActualizados.getPrecio());
                    return ResponseEntity.ok(productoRepository.save(producto));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE - Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        if (!productoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

/*package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.ProductoDTO;
import com.levelupstore.backend.dto.ApiResponse;
import com.levelupstore.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    /**
     * GET /api/productos
     * Listar todos los productos activos
     
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> listarProductos() {
        List<ProductoDTO> productos = productoService.listarProductos();
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/{id}
     * Obtener producto por ID
     
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {
        return productoService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET /api/productos/categoria/{categoria}
     * Filtrar productos por categoría
     
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDTO>> productosPorCategoria(@PathVariable String categoria) {
        List<ProductoDTO> productos = productoService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/buscar?nombre=xxx
     * Buscar productos por nombre
     
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarPorNombre(@RequestParam String nombre) {
        List<ProductoDTO> productos = productoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }
}
*/
