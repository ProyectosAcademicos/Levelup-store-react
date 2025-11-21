package com.levelupstore.backend.service;

import com.levelupstore.backend.model.*;
import com.levelupstore.backend.repository.OrdenRepository;
import com.levelupstore.backend.repository.ProductoRepository;
import com.levelupstore.backend.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdenService {
    
    @Autowired
    private OrdenRepository ordenRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private ProductoService productoService;
    
    @Autowired
    private CarritoService carritoService;
    
    @Transactional
    public OrdenDTO crearOrden(Usuario usuario, OrdenRequest request) {
        // Validaciones
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("La orden debe contener al menos un producto");
        }
        
        // Validar stock
        for (OrdenItemRequest item : request.getItems()) {
            if (!productoService.verificarStock(item.getProductoId(), item.getCantidad())) {
                Producto prod = productoService.obtenerProductoOThrow(item.getProductoId());
                throw new RuntimeException("Stock insuficiente para: " + prod.getNombre());
            }
        }
        
        // Crear orden
        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setTotal(request.getTotal());
        orden.setEstado(EstadoOrden.PENDIENTE);
        orden.setMetodoPago(request.getMetodoPago());
        orden.setDireccionEnvio(request.getDireccionEnvio());
        orden.setTelefono(request.getTelefono());
        orden.setNotas(request.getNotas());
        orden.setCreadoEn(LocalDateTime.now());
        orden.setActualizadoEn(LocalDateTime.now());
        
        // Agregar detalles
        for (OrdenItemRequest itemReq : request.getItems()) {
            Producto producto = productoService.obtenerProductoOThrow(itemReq.getProductoId());
            
            OrdenDetalle detalle = new OrdenDetalle();
            detalle.setOrden(orden);
            detalle.setProducto(producto);
            detalle.setCantidad(itemReq.getCantidad());
            detalle.setPrecioUnitario(itemReq.getPrecioUnitario());
            
            BigDecimal subtotal = itemReq.getPrecioUnitario()
                .multiply(BigDecimal.valueOf(itemReq.getCantidad()));
            detalle.setSubtotal(subtotal);
            
            orden.getDetalles().add(detalle);
            
            // Reducir stock
            productoService.reducirStock(producto.getId(), itemReq.getCantidad());
        }
        
        Orden ordenGuardada = ordenRepository.save(orden);
        carritoService.limpiarCarrito(usuario);
        
        return convertirADTO(ordenGuardada);
    }
    
    public List<OrdenDTO> obtenerOrdenesUsuario(Usuario usuario) {
        return ordenRepository.findByUsuarioOrderByCreadoEnDesc(usuario)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    public OrdenDTO obtenerOrdenPorId(Long ordenId, Usuario usuario) {
        Orden orden = ordenRepository.findById(ordenId)
            .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        
        if (!orden.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No autorizado para ver esta orden");
        }
        
        return convertirADTO(orden);
    }
    
    @Transactional
    public OrdenDTO cambiarEstado(Long ordenId, EstadoOrden nuevoEstado, Usuario usuario) {
        Orden orden = ordenRepository.findById(ordenId)
            .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        
        if (!orden.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No autorizado");
        }
        
        orden.setEstado(nuevoEstado);
        orden.setActualizadoEn(LocalDateTime.now());
        Orden ordenActualizada = ordenRepository.save(orden);
        
        return convertirADTO(ordenActualizada);
    }
    
    @Transactional
    public OrdenDTO cancelarOrden(Long ordenId, Usuario usuario) {
        Orden orden = ordenRepository.findById(ordenId)
            .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        
        if (!orden.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No autorizado");
        }
        
        if (!orden.getEstado().equals(EstadoOrden.PENDIENTE)) {
            throw new RuntimeException("Solo se pueden cancelar órdenes en estado PENDIENTE");
        }
        
        // Restaurar stock
        for (OrdenDetalle detalle : orden.getDetalles()) {
            productoService.aumentarStock(detalle.getProducto().getId(), detalle.getCantidad());
        }
        
        orden.setEstado(EstadoOrden.CANCELADA);
        orden.setActualizadoEn(LocalDateTime.now());
        Orden ordenCancelada = ordenRepository.save(orden);
        
        return convertirADTO(ordenCancelada);
    }
    
    public List<OrdenDTO> obtenerOrdenesPorestado(EstadoOrden estado) {
        return ordenRepository.findByEstado(estado)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    private OrdenDTO convertirADTO(Orden orden) {
        OrdenDTO dto = new OrdenDTO();
        dto.setId(orden.getId());
        dto.setUsuarioId(orden.getUsuario().getId());
        dto.setUsuarioNombre(orden.getUsuario().getNombre());
        dto.setTotal(orden.getTotal());
        dto.setEstado(orden.getEstado());
        dto.setMetodoPago(orden.getMetodoPago());
        dto.setDireccionEnvio(orden.getDireccionEnvio());
        dto.setTelefono(orden.getTelefono());
        dto.setNotas(orden.getNotas());
        dto.setCreadoEn(orden.getCreadoEn());
        
        List<OrdenDetalleDTO> detalles = orden.getDetalles().stream()
            .map(this::convertirDetalleADTO)
            .collect(Collectors.toList());
        dto.setDetalles(detalles);
        
        return dto;
    }
    
    private OrdenDetalleDTO convertirDetalleADTO(OrdenDetalle detalle) {
        OrdenDetalleDTO dto = new OrdenDetalleDTO();
        dto.setProductoId(detalle.getProducto().getId());
        dto.setProductoNombre(detalle.getProducto().getNombre());
        dto.setProductoImagen(detalle.getProducto().getImagenFile());
        dto.setCantidad(detalle.getCantidad());
        dto.setPrecioUnitario(detalle.getPrecioUnitario());
        dto.setSubtotal(detalle.getSubtotal());
        return dto;
    }

}