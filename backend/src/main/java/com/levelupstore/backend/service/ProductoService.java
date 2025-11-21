package com.levelupstore.backend.service;

import com.levelupstore.backend.model.Producto;
import com.levelupstore.backend.repository.ProductoRepository;
import com.levelupstore.backend.dto.ProductoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<ProductoDTO> listarProductos() {
        return productoRepository.findByActivoTrue()
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    public Optional<ProductoDTO> buscarPorId(Long id) {
        return productoRepository.findById(id)
            .map(this::convertirADTO);
    }
    
    public List<ProductoDTO> buscarPorCategoria(String categoria) {
        return productoRepository.findByCategoriaAndActivoTrue(categoria)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    public List<ProductoDTO> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    public boolean verificarStock(Long productoId, Integer cantidad) {
        Optional<Producto> producto = productoRepository.findById(productoId);
        return producto.isPresent() && producto.get().getStock() >= cantidad;
    }
    
    public Producto obtenerProductoOThrow(Long productoId) {
        return productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productoId));
    }
    
    public void reducirStock(Long productoId, Integer cantidad) {
        Producto producto = obtenerProductoOThrow(productoId);
        
        if (producto.getStock() < cantidad) {
            throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
        }
        
        producto.setStock(producto.getStock() - cantidad);
        productoRepository.save(producto);
    }
    
    public void aumentarStock(Long productoId, Integer cantidad) {
        Producto producto = obtenerProductoOThrow(productoId);
        producto.setStock(producto.getStock() + cantidad);
        productoRepository.save(producto);
    }

    private ProductoDTO convertirADTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setImagenUrl(producto.getImagenUrl());
        dto.setImagenFile(producto.getImagenFile());
        dto.setStock(producto.getStock());
        dto.setCategoria(producto.getCategoria());
        dto.setActivo(producto.getActivo());
        return dto;
    }
}