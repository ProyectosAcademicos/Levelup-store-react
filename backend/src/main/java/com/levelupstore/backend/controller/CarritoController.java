package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.CarritoRequest;
import com.levelupstore.backend.dto.CarritoItemDTO;
import com.levelupstore.backend.dto.ApiResponse;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://18.233.237.152:5174"
})
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @GetMapping
    public ResponseEntity<?> obtenerCarrito(Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            List<CarritoItemDTO> carrito = carritoService.obtenerCarrito(usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Carrito obtenido", carrito));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestBody CarritoRequest request,
            Authentication authentication) {
        if (request.getProductoId() == null || request.getCantidad() == null)
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "ProductoId y cantidad son obligatorios", null));

        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            CarritoItemDTO item = carritoService.agregarProducto(usuario,
                    request.getProductoId(), request.getCantidad());
            return ResponseEntity.ok(new ApiResponse<>(true, "Producto agregado al carrito", item));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> actualizarCantidad(@PathVariable Long itemId,
            @RequestBody CarritoRequest request,
            Authentication authentication) {
        if (request.getCantidad() == null)
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Cantidad es obligatoria", null));

        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            CarritoItemDTO item = carritoService.actualizarCantidad(usuario, itemId, request.getCantidad());
            return ResponseEntity.ok(new ApiResponse<>(true, "Cantidad actualizada", item));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> eliminarItem(@PathVariable Long itemId, Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            carritoService.eliminarItem(usuario, itemId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Item eliminado", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> limpiarCarrito(Authentication authentication) {
        try {
            Usuario usuario = obtenerUsuarioAutenticado(authentication);
            carritoService.limpiarCarrito(usuario);
            return ResponseEntity.ok(new ApiResponse<>(true, "Carrito limpiado", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    // ✅ Recupera el usuario directamente desde Authentication
    private Usuario obtenerUsuarioAutenticado(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof Usuario))
            throw new RuntimeException("Usuario no autenticado");

        return (Usuario) authentication.getPrincipal();
    }
}


// package com.levelupstore.backend.controller;

// import com.levelupstore.backend.dto.CarritoRequest;
// import com.levelupstore.backend.dto.CarritoItemDTO;
// import com.levelupstore.backend.dto.ApiResponse;
// import com.levelupstore.backend.model.Usuario;
// import com.levelupstore.backend.service.CarritoService;
// import com.levelupstore.backend.repository.UsuarioRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/carrito")
// @CrossOrigin(origins = {
//         "http://localhost:5173",
//         "http://18.233.237.152:5174"
// })
// public class CarritoController {

//     @Autowired
//     private CarritoService carritoService;

//     @Autowired
//     private UsuarioRepository usuarioRepository;

//     @GetMapping
//     public ResponseEntity<?> obtenerCarrito(Authentication authentication) {
//         try {
//             Usuario usuario = obtenerUsuarioAutenticado(authentication);
//             List<CarritoItemDTO> carrito = carritoService.obtenerCarrito(usuario);
//             return ResponseEntity.ok(new ApiResponse<>(true, "Carrito obtenido", carrito));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
//         }
//     }

//     @PostMapping("/agregar")
//     public ResponseEntity<?> agregarProducto(@RequestBody CarritoRequest request,
//             Authentication authentication) {
//         if (request.getProductoId() == null || request.getCantidad() == null)
//             return ResponseEntity.badRequest()
//                     .body(new ApiResponse<>(false, "ProductoId y cantidad son obligatorios", null));

//         try {
//             Usuario usuario = obtenerUsuarioAutenticado(authentication);
//             CarritoItemDTO item = carritoService.agregarProducto(usuario,
//                     request.getProductoId(), request.getCantidad());
//             return ResponseEntity.ok(new ApiResponse<>(true, "Producto agregado al carrito", item));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
//         }
//     }

//     @PutMapping("/{itemId}")
//     public ResponseEntity<?> actualizarCantidad(@PathVariable Long itemId,
//             @RequestBody CarritoRequest request,
//             Authentication authentication) {
//         if (request.getCantidad() == null)
//             return ResponseEntity.badRequest()
//                     .body(new ApiResponse<>(false, "Cantidad es obligatoria", null));

//         try {
//             Usuario usuario = obtenerUsuarioAutenticado(authentication);
//             CarritoItemDTO item = carritoService.actualizarCantidad(usuario, itemId, request.getCantidad());
//             return ResponseEntity.ok(new ApiResponse<>(true, "Cantidad actualizada", item));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
//         }
//     }

//     @DeleteMapping("/{itemId}")
//     public ResponseEntity<?> eliminarItem(@PathVariable Long itemId, Authentication authentication) {
//         try {
//             Usuario usuario = obtenerUsuarioAutenticado(authentication);
//             carritoService.eliminarItem(usuario, itemId);
//             return ResponseEntity.ok(new ApiResponse<>(true, "Item eliminado", null));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
//         }
//     }

//     @DeleteMapping
//     public ResponseEntity<?> limpiarCarrito(Authentication authentication) {
//         try {
//             Usuario usuario = obtenerUsuarioAutenticado(authentication);
//             carritoService.limpiarCarrito(usuario);
//             return ResponseEntity.ok(new ApiResponse<>(true, "Carrito limpiado", null));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
//         }
//     }

//     private Usuario obtenerUsuarioAutenticado(Authentication authentication) {
//         if (authentication == null)
//             throw new RuntimeException("Usuario no autenticado");

//         String email = authentication.getName();
//         return usuarioRepository.findByCorreo(email)
//                 .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
//     }
// }
