package com.levelupstore.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.levelupstore.backend.dto.ProductoDTO;
import com.levelupstore.backend.model.Producto;
import com.levelupstore.backend.repository.ProductoRepository;

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

    //para implementar crear y actualizar productos

     private Producto convertirAEntidad(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setId(dto.getId());
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setImagenUrl(dto.getImagenUrl());
        producto.setImagenFile(dto.getImagenFile());
        producto.setStock(dto.getStock());
        producto.setCategoria(dto.getCategoria());
        producto.setActivo(dto.getActivo());
        // creadoEn y actualizadoEn los manejamos al crear/actualizar
        return producto;
    }

    public ProductoDTO crearProducto(ProductoDTO dto) {
        // Convertimos el DTO a entidad
        Producto producto = convertirAEntidad(dto);

        // Nos aseguramos que el ID sea null para que se auto-genere
        producto.setId(null);

        // Manejo de fechas (opcional, si no, las pone la BD o la entidad)
        producto.setCreadoEn(LocalDateTime.now());
        producto.setActualizadoEn(LocalDateTime.now());

        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }

    public ProductoDTO actualizarProducto(Long id, ProductoDTO dto) {
        // Buscamos el producto existente
        Producto existente = obtenerProductoOThrow(id);

        // Actualizamos sus campos con los valores del DTO
        existente.setNombre(dto.getNombre());
        existente.setDescripcion(dto.getDescripcion());
        existente.setPrecio(dto.getPrecio());
        existente.setImagenUrl(dto.getImagenUrl());
        existente.setImagenFile(dto.getImagenFile());
        existente.setStock(dto.getStock());
        existente.setCategoria(dto.getCategoria());
        existente.setActivo(dto.getActivo());
        existente.setActualizadoEn(LocalDateTime.now());

        Producto guardado = productoRepository.save(existente);
        return convertirADTO(guardado);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}