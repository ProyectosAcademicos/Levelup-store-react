package com.levelupstore.backend.service;

import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

/**
 * Servicio que contiene la lógica de negocio para manejar usuarios:
 * registro, validaciones, y cifrado de contraseñas.
 */
@Service
public class UsuarioService {

    // Inyección de dependencias: el repositorio y el codificador de contraseñas.
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registra un nuevo usuario en la base de datos.
     * Incluye validaciones de RUT, correo, contraseña y cifrado de seguridad.
     *
     * @param usuario Objeto recibido desde el controlador con los datos del nuevo
     *                usuario.
     * @return Usuario guardado en la base de datos (con la contraseña encriptada).
     * @throws Exception si alguna validación falla.
     */

    /**
     * Autentica a un usuario verificando su correo y contraseña.
     * 
     * @param correo     correo del usuario
     * @param contrasena contraseña en texto plano
     * @return el usuario autenticado si las credenciales son correctas, o null si
     *         no lo son
     */

    public Usuario registrarUsuario(Usuario usuario) throws Exception {

        // --- VALIDACIONES DE NEGOCIO ---

        // 1. Validar RUT chileno (estructura + dígito verificador)
        if (!validarRutChileno(usuario.getRut())) {
            throw new Exception("El RUT ingresado no es válido.");
        }

        // 2. Validar que el RUT no esté registrado previamente
        if (usuarioRepository.findByRut(usuario.getRut()).isPresent()) {
            throw new Exception("El RUT ya está registrado en el sistema.");
        }

        // 3. Validar que el correo no esté registrado
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new Exception("El correo electrónico ya está registrado.");
        }

        // 4. Validar que la contraseña no esté vacía
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new Exception("La contraseña no puede estar vacía.");
        }

        // 5. Validar formato del correo (opcional, pero recomendable)
        if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new Exception("El formato del correo electrónico no es válido.");
        }

        // --- ASIGNACIÓN DE ROL ---
        if (usuario.getRol() != null && usuario.getRol().equalsIgnoreCase("ADMIN")) {
            usuario.setRol("ADMIN");
        } else {
            usuario.setRol("CLIENTE");
        }

        // --- CIFRADO DE CONTRASEÑA ---

        // Tomamos la contraseña en texto plano
        String contrasenaPlana = usuario.getContrasena();
        usuario.setContrasena(passwordEncoder.encode(contrasenaPlana));

        // --- GUARDADO EN BASE DE DATOS ---

        // Guardamos el usuario en la base de datos.
        // Spring Data JPA genera automáticamente el ID.
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

    /**
     * Valida un RUT chileno verificando su dígito verificador (DV).
     *
     * @param rut RUT ingresado (puede incluir puntos o guion).
     * @return true si el RUT es válido, false en caso contrario.
     */
    private boolean validarRutChileno(String rut) {
        try {
            // 1. Limpiar formato (quitar puntos y guiones)
            rut = rut.replace(".", "").replace("-", "").trim();

            // Si es demasiado corto, es inválido
            if (rut.length() < 8)
                return false;

            // 2. Separar cuerpo y dígito verificador
            String cuerpo = rut.substring(0, rut.length() - 1);
            char dv = rut.substring(rut.length() - 1).toUpperCase().charAt(0);

            // 3. Calcular el dígito verificador esperado
            int suma = 0;
            int multiplo = 2;

            for (int i = cuerpo.length() - 1; i >= 0; i--) {
                suma += multiplo * Character.getNumericValue(cuerpo.charAt(i));
                multiplo = (multiplo < 7) ? multiplo + 1 : 2;
            }

            int dvEsperado = 11 - (suma % 11);
            char dvCalculado;

            if (dvEsperado == 11) {
                dvCalculado = '0';
            } else if (dvEsperado == 10) {
                dvCalculado = 'K';
            } else {
                dvCalculado = (char) (dvEsperado + '0');
            }

            // 4. Comparar el DV ingresado con el calculado
            return dv == dvCalculado;

        } catch (Exception e) {
            // Si ocurre cualquier error (por ejemplo, caracteres no numéricos)
            return false;
        }
    }

    public Usuario autenticarUsuario(String correo, String contrasena) {
        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario == null) {
            return null; // No existe usuario con ese correo
        }

        // Verificar la contraseña cifrada
        if (passwordEncoder.matches(contrasena, usuario.getContrasena())) {
            return usuario;
        }

        return null; // Contraseña incorrecta
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

}
