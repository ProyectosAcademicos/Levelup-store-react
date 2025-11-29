package com.levelupstore.backend.service;

import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario) throws Exception {

        // --- VALIDACIONES DE NEGOCIO ---
        if (!validarRutChileno(usuario.getRut())) {
            throw new Exception("El RUT ingresado no es válido.");
        }

        if (usuarioRepository.findByRut(usuario.getRut()).isPresent()) {
            throw new Exception("El RUT ya está registrado en el sistema.");
        }

        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new Exception("El correo electrónico ya está registrado.");
        }

        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new Exception("La contraseña no puede estar vacía.");
        }

        if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new Exception("El formato del correo electrónico no es válido.");
        }

        // --- ASIGNACIÓN DE ROL CORRECTA ---
        String rolRecibido = usuario.getRol();
        if (rolRecibido == null || rolRecibido.isBlank()) {
            usuario.setRol("USER");
        } else {
            usuario.setRol(rolRecibido.toUpperCase());
        }

        // --- CIFRADO DE CONTRASEÑA ---
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        // --- GUARDADO EN BD ---
        return usuarioRepository.save(usuario);
    }

    public Usuario findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo).orElse(null);
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    private boolean validarRutChileno(String rut) {
        try {
            rut = rut.replace(".", "").replace("-", "").trim();
            if (rut.length() < 8)
                return false;

            String cuerpo = rut.substring(0, rut.length() - 1);
            char dv = rut.substring(rut.length() - 1).toUpperCase().charAt(0);

            int suma = 0;
            int multiplo = 2;
            for (int i = cuerpo.length() - 1; i >= 0; i--) {
                suma += multiplo * Character.getNumericValue(cuerpo.charAt(i));
                multiplo = (multiplo < 7) ? multiplo + 1 : 2;
            }

            int dvEsperado = 11 - (suma % 11);
            char dvCalculado;
            if (dvEsperado == 11)
                dvCalculado = '0';
            else if (dvEsperado == 10)
                dvCalculado = 'K';
            else
                dvCalculado = (char) (dvEsperado + '0');

            return dv == dvCalculado;

        } catch (Exception e) {
            return false;
        }
    }

    public Usuario autenticarUsuario(String correo, String contrasena) {
        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);
        if (usuario == null)
            return null;

        return passwordEncoder.matches(contrasena, usuario.getContrasena()) ? usuario : null;
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }
}