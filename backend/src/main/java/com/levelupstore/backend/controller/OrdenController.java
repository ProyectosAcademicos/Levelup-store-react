package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.OrdenRequest;
import com.levelupstore.backend.dto.OrdenDTO;
import com.levelupstore.backend.dto.ApiResponse;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.model.EstadoOrden;
import com.levelupstore.backend.service.OrdenService;
import com.levelupstore.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://18.233.237.152:5174" })

public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * GET /api/ordenes
     * Obtener listado de órdenes del usuario autenticado
     */
    @GetMapping
    public ResponseEntity<?> listarOrdenes(Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            List<OrdenDTO> ordenes = ordenService.obtenerOrdenesUsuario(usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Listado de órdenes", ordenes));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * POST /api/ordenes/crear
     * Crear nueva orden
     */
    @PostMapping("/crear")
    public ResponseEntity<?> crearOrden(
            @RequestBody OrdenRequest request,
            Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            OrdenDTO orden = ordenService.crearOrden(usuario, request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Orden creada exitosamente", orden));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * GET /api/ordenes/mis-ordenes
     * Ver mis órdenes
     */
    @GetMapping("/mis-ordenes")
    public ResponseEntity<?> obtenerMisOrdenes(Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            List<OrdenDTO> ordenes = ordenService.obtenerOrdenesUsuario(usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Listado de órdenes", ordenes));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * GET /api/ordenes/{id}
     * Ver detalle de una orden
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerOrden(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            OrdenDTO orden = ordenService.obtenerOrdenPorId(id, usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Orden encontrada", orden));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * PUT /api/ordenes/{id}/cambiar-estado
     * Cambiar estado de una orden
     */
    @PutMapping("/{id}/cambiar-estado")
    public ResponseEntity<?> cambiarEstado(
            @PathVariable Long id,
            @RequestParam EstadoOrden estado,
            Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            OrdenDTO orden = ordenService.cambiarEstado(id, estado, usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Estado actualizado", orden));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}/confirmar-pago")
    public ResponseEntity<?> confirmarPago(
            @PathVariable Long id,
            Authentication authentication) {

        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            OrdenDTO orden = ordenService.confirmarPago(id, usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Pago confirmado", orden));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * DELETE /api/ordenes/{id}/cancelar
     * Cancelar una orden
     */
    @DeleteMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarOrden(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            OrdenDTO orden = ordenService.cancelarOrden(id, usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Orden cancelada", orden));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    /**
     * Helper: Obtener usuario autenticado
     */
    private Usuario obtenerUsuarioAutenticado(Authentication authentication) {
        // 1 - Obtener el principal (que es el objeto Usuario que se coloco en el
        // filtro)
        Object principal = authentication.getPrincipal();

        // 2. Verificar que el principal sea una instancia de Usuario (seguridad)
        if (principal instanceof Usuario) {
            return (Usuario) principal;
        } else {

            // Esto deberia ser un error grave si el filtro esta bien implementado
            throw new RuntimeException("Usuario no autenticado");
        }
    }

    // private Usuario obtenerUsuarioAutenticado(Authentication authentication) {
    // String email = authentication.getName();
    // return usuarioRepository.findByCorreo(email)
    // .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    // }

    @GetMapping("/historial")
    public ResponseEntity<?> obtenerHistorialCompras(Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            List<OrdenDTO> historial = ordenService.obtenerHistorialCompras(usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Historial de compras", historial));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}