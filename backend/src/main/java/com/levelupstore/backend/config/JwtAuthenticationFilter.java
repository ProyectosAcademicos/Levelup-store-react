package com.levelupstore.backend.config;

import com.levelupstore.backend.service.UsuarioService;
import com.levelupstore.backend.controller.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String correo = jwtUtil.getCorreoDesdeToken(token);

            if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Puedes obtener el Usuario desde el servicio para validar existencia/rol
                var usuario = usuarioService.findByCorreo(correo);
                if (usuario != null) {
                    // Crear Authentication simple con el rol (si existe)
                    String rol = usuario.getRol() != null ? usuario.getRol() : "CLIENTE";
                    var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + rol));
                    var auth = new UsernamePasswordAuthenticationToken(correo, null, authorities);

                    // Colocar en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
