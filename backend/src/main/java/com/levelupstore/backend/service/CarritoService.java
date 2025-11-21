package com.levelupstore.backend.service;

import com.levelupstore.backend.model.Carrito;
import com.levelupstore.backend.model.Producto;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.repository.CarritoRepository;
import com.levelupstore.backend.repository.ProductoRepository;
import com.levelupstore.backend.dto.CarritoItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarritoService {
    
    @Autowired
    private CarritoRepository carritoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<CarritoItemDTO> obtenerCarrito(Usuario usuario) {
        List<Carrito> items = carritoRepository.findByUsuario(usuario);
        return items.stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public CarritoItemDTO agregarProducto(Usuario usuario, Long productoId, Integer cantidad) {
        Producto producto = productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        Carrito item = carritoRepository.findByUsuarioAndProducto(usuario, producto)
            .orElse(null);
        
        if (item != null) {
            item.setCantidad(item.getCantidad() + cantidad);
        } else {
            item = new Carrito();
            item.setUsuario(usuario);
            item.setProducto(producto);
            item.setCantidad(cantidad);
        }
        
        Carrito saved = carritoRepository.save(item);
        return convertirADTO(saved);
    }
    
    @Transactional
    public CarritoItemDTO actualizarCantidad(Usuario usuario, Long itemId, Integer cantidad) {
        Carrito item = carritoRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Item no encontrado en el carrito"));
        
        if (!item.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No autorizado");
        }
        
        if (cantidad <= 0) {
            carritoRepository.delete(item);
            return null;
        }
        
        item.setCantidad(cantidad);
        Carrito saved = carritoRepository.save(item);
        return convertirADTO(saved);
    }
    
    @Transactional
    public void eliminarItem(Usuario usuario, Long itemId) {
        Carrito item = carritoRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Item no encontrado"));
        
        if (!item.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No autorizado");
        }
        
        carritoRepository.delete(item);
    }
    
    @Transactional
    public void limpiarCarrito(Usuario usuario) {
        carritoRepository.deleteByUsuario(usuario);
    }
    
    // ✅ MÉTODO CORREGIDO
    private CarritoItemDTO convertirADTO(Carrito carrito) {
        CarritoItemDTO dto = new CarritoItemDTO();
        dto.setId(carrito.getId());
        dto.setProductoId(carrito.getProducto().getId());
        dto.setNombre(carrito.getProducto().getNombre());
        dto.setDescripcion(carrito.getProducto().getDescripcion());
        dto.setPrecio(carrito.getProducto().getPrecio());
        dto.setImagenUrl(carrito.getProducto().getImagenUrl());
        dto.setImagenFile(carrito.getProducto().getImagenFile());  // ✅ CORREGIDO
        dto.setCantidad(carrito.getCantidad());
        
        BigDecimal subtotal = carrito.getProducto().getPrecio()
            .multiply(BigDecimal.valueOf(carrito.getCantidad()));
        dto.setSubtotal(subtotal);
        
        return dto;
    }
}