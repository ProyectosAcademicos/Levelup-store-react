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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.levelupstore.backend.dto.UsuarioDTO;
import java.util.Map;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Permite peticiones desde Vite (React)
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ComunaRepository comunaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;


    /**
     * Endpoint para registrar un nuevo usuario.
     * Escucha en la URL: POST /api/auth/register
     */

    @GetMapping("/me")
    public ResponseEntity<?> obtenerDatosUsuario(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
        .body(Map.of("error", "Token no proporcionado."));
        }

        String token = authHeader.replace("Bearer ", "");

        // Obtener el correo desde el JWT
        String correo = jwtUtil.getCorreoDesdeToken(token);

        if (correo == null) {
            return ResponseEntity
            .status(403)
            .body(Map.of("error", "Token inválido"));
        }

        Usuario usuario = usuarioService.findByCorreo(correo);

        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        usuario.setContrasena(null); // 👈 nunca enviar contraseñas

        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/all")
    public ResponseEntity<?> obtenerTodosLosUsuarios(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Token no proporcionado."));
        }

        String token = authHeader.replace("Bearer ", "");
        String correo = jwtUtil.getCorreoDesdeToken(token);

        if (correo == null) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Token inválido"));
        }

        // Aquí verificas si el usuario existe y tiene permiso
        Usuario usuario = usuarioService.findByCorreo(correo);

        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            // Buscar la región y comuna en la base de datos
            Region region = regionRepository.findById(usuarioDTO.getRegionId())
                    .orElseThrow(() -> new Exception("Región no encontrada"));
            Comuna comuna = comunaRepository.findById(usuarioDTO.getComunaId())
                    .orElseThrow(() -> new Exception("Comuna no encontrada"));

            // Crear el objeto Usuario y asignar datos
            Usuario usuario = new Usuario();
            usuario.setRut(usuarioDTO.getRut());
            usuario.setNombre(usuarioDTO.getNombre());
            usuario.setApellido(usuarioDTO.getApellido());
            usuario.setCorreo(usuarioDTO.getCorreo());

            usuario.setContrasena(usuarioDTO.getContrasena()); 
            usuario.setTelefono(usuarioDTO.getTelefono());
            usuario.setDireccion(usuarioDTO.getDireccion());
            usuario.setRol(usuarioDTO.getRol());
            usuario.setRegion(region);
            usuario.setComuna(comuna);

            // Registrar el usuario
            Usuario usuarioRegistrado = usuarioService.registrarUsuario(usuario);
            usuarioRegistrado.setContrasena(null);

            // Retornar respuesta
            return new ResponseEntity<>(usuarioRegistrado, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para autenticar un usuario.
     * Escucha en la URL: POST /api/auth/login
     */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Usuario usuario = usuarioService.autenticarUsuario(
                request.getEmail(),
                request.getPassword()
        );

        if (usuario == null) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        String token = jwtUtil.generarToken(usuario.getCorreo());

        return ResponseEntity.ok(new LoginResponse(token, usuario));
    }

    // DTOs internos
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
