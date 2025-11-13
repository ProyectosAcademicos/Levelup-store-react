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

    /**
     * Endpoint para registrar un nuevo usuario.
     * Escucha en la URL: POST /api/auth/register
     */
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

            usuario.setContrasena(passwordEncoder.encode(usuarioDTO.getContrasena()));
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
    public ResponseEntity<?> loginUsuario(@RequestBody Map<String, String> credentials) {

        String correo = credentials.get("email");
        String contrasena = credentials.get("password");

        Usuario usuario = usuarioService.autenticarUsuario(correo, contrasena);

        if (usuario == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }

        usuario.setContrasena(null); // No devolver la contraseña
        return ResponseEntity.ok(usuario);
    }
}
