package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.ApiResponse;
import com.levelupstore.backend.dto.OrdenDTO;
import com.levelupstore.backend.dto.OrdenRequest;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.service.CarritoService;
import com.levelupstore.backend.service.OrdenService;
import com.levelupstore.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = { "http://localhost:5173", "http://18.233.237.152:5174" })
public class OrdenAutomatizacionController {

    @Autowired
    private OrdenService ordenService;

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Authentication authentication,
            @RequestBody OrdenRequest request) {
        try {
            if (authentication == null)
                return ResponseEntity.status(401)
                        .body(new ApiResponse<>(false, "Usuario no autenticado", null));

            Usuario usuario = usuarioRepository.findByCorreo(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Traer items del carrito
            var carritoItems = carritoService.obtenerCarrito(usuario);
            if (carritoItems.isEmpty())
                return ResponseEntity.badRequest()
                        .body(new ApiResponse<>(false, "El carrito está vacío", null));

            // Transformar carrito a OrdenRequest.items
            var items = carritoItems.stream().map(item -> {
                return new com.levelupstore.backend.dto.OrdenItemRequest(
                        item.getProductoId(),
                        item.getCantidad(),
                        item.getPrecio());
            }).toList();
            request.setItems(items);

            // Total
            var total = items.stream()
                    .map(i -> i.getPrecioUnitario().multiply(new java.math.BigDecimal(i.getCantidad())))
                    .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
            request.setTotal(total);

            // Crear la orden
            OrdenDTO orden = ordenService.crearOrden(usuario, request);

            return ResponseEntity.ok(new ApiResponse<>(true, "Orden creada exitosamente", orden));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
