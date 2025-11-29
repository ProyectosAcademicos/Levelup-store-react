package com.levelupstore.backend.controller;

import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.model.Region;
import com.levelupstore.backend.model.Comuna;
import com.levelupstore.backend.service.UsuarioService;
import com.levelupstore.backend.repository.RegionRepository;
import com.levelupstore.backend.repository.ComunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.levelupstore.backend.dto.UsuarioDTO;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ComunaRepository comunaRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ---------------------------------------------------------------------
    // VALIDACIÓN GENERAL DEL TOKEN
    // ---------------------------------------------------------------------
    private Usuario validarTokenYObtenerUsuario(String authHeader, boolean requiereAdmin) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null; // Se manejará afuera
        }

        String token = authHeader.replace("Bearer ", "");

        String correo = jwtUtil.getCorreoDesdeToken(token);
        String rol = jwtUtil.getRolDesdeToken(token);

        if (correo == null || rol == null) {
            return null;
        }

        if (requiereAdmin && !"ADMIN".equals(rol)) {
            return new Usuario(); // Marcamos usuario vacío como señal de "sin permisos"
        }

        return usuarioService.findByCorreo(correo);
    }

    // ---------------------------------------------------------------------
    // OBTENER DATOS DEL USUARIO AUTENTICADO  ( /me )
    // ---------------------------------------------------------------------
    @GetMapping("/me")
    public ResponseEntity<?> obtenerDatosUsuario(@RequestHeader("Authorization") String authHeader) {

        Usuario usuario = validarTokenYObtenerUsuario(authHeader, false);

        if (usuario == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Token inválido o no proporcionado"));
        }

        usuario.setContrasena(null);

        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(
                Map.of(
                        "usuario", usuario,
                        "rol", jwtUtil.getRolDesdeToken(token)
                )
        );
    }

    // ---------------------------------------------------------------------
    // ADMIN: OBTENER TODOS LOS USUARIOS ( /all )
    // ---------------------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> obtenerTodosLosUsuarios(@RequestHeader("Authorization") String authHeader) {

        Usuario usuario = validarTokenYObtenerUsuario(authHeader, true);

        if (usuario == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Token inválido o no proporcionado"));
        }

        if (usuario.getId() == null) { // Señal de "sin permisos"
            return ResponseEntity.status(403).body(Map.of("error", "No tienes permisos de administrador"));
        }

        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    // ---------------------------------------------------------------------
    // REGISTRO DE USUARIO ( /register )
    // ---------------------------------------------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Region region = regionRepository.findById(usuarioDTO.getRegionId())
                    .orElseThrow(() -> new Exception("Región no encontrada"));

            Comuna comuna = comunaRepository.findById(usuarioDTO.getComunaId())
                    .orElseThrow(() -> new Exception("Comuna no encontrada"));

            Usuario usuario = new Usuario();
            usuario.setRut(usuarioDTO.getRut());
            usuario.setNombre(usuarioDTO.getNombre());
            usuario.setApellido(usuarioDTO.getApellido());
            usuario.setCorreo(usuarioDTO.getCorreo());
            usuario.setContrasena(usuarioDTO.getContrasena());
            usuario.setTelefono(usuarioDTO.getTelefono());
            usuario.setDireccion(usuarioDTO.getDireccion());
            usuario.setRegion(region);
            usuario.setComuna(comuna);

            // Si no viene rol, asignar USER
            usuario.setRol(usuarioDTO.getRol() != null ? usuarioDTO.getRol() : "USER");

            Usuario usuarioRegistrado = usuarioService.registrarUsuario(usuario);
            usuarioRegistrado.setContrasena(null);

            return new ResponseEntity<>(usuarioRegistrado, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------------
    // LOGIN ( /login )
    // ---------------------------------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Usuario usuario = usuarioService.autenticarUsuario(
                request.getEmail(),
                request.getPassword()
        );

        if (usuario == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
        }

        String token = jwtUtil.generarToken(usuario.getCorreo(), usuario.getRol());

        return ResponseEntity.ok(new LoginResponse(token, usuario));
    }

    // ---------------------------------------------------------------------
    // ACTUALIZAR USUARIO ( /update/{id} )
    // ---------------------------------------------------------------------
    @PutMapping("/update/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuario) {
        try {
            Usuario usuarioExistente = usuarioService.obtenerPorId(id);

            if (usuarioExistente == null) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setCorreo(usuario.getCorreo());

            if (usuario.getContrasena() != null && !usuario.getContrasena().isEmpty()) {
                usuarioExistente.setContrasena(usuario.getContrasena());
            }

            Usuario actualizado = usuarioService.actualizarUsuario(usuarioExistente);
            actualizado.setContrasena(null);

            return new ResponseEntity<>(actualizado, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------------
    // ELIMINAR USUARIO
    // ---------------------------------------------------------------------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            Usuario usuarioExistente = usuarioService.obtenerPorId(id);

            if (usuarioExistente == null) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            usuarioService.eliminarUsuario(id);
            return new ResponseEntity<>("Usuario eliminado correctamente", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------------
    // DTOs internos
    // ---------------------------------------------------------------------
    static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    static class LoginResponse {
        public String token;
        public Usuario usuario;

        public LoginResponse(String token, Usuario usuario) {
            this.token = token;
            this.usuario = usuario;
            this.usuario.setContrasena(null);
        }
    }
}
