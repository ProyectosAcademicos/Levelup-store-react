package com.levelupstore.backend.controller;

import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.service.UsuarioService;
import com.levelupstore.backend.controller.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<?> obtenerDatosUsuario(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token no proporcionado.");
        }

        String token = authHeader.replace("Bearer ", "");

        // Obtener el correo desde el JWT
        String correo = jwtUtil.getCorreoDesdeToken(token);

        if (correo == null) {
            return ResponseEntity.status(403).body("Token inválido.");
        }

        Usuario usuario = usuarioService.findByCorreo(correo);

        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        usuario.setContrasena(null); // 👈 nunca enviar contraseñas

        return ResponseEntity.ok(usuario);
    }
}
