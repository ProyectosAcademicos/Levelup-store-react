package com.levelupstore.backend.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Clave secreta (mínimo 32 caracteres)
    private static final String SECRET = "miClaveUltraSecretaParaFirmarJWT123456";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Duración del token (24 horas)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // ---------------------------------------------------------------------
    // GENERAR TOKEN
    // ---------------------------------------------------------------------
    public String generarToken(String correo, String rol) {
        return Jwts.builder()
                .setSubject(correo)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    // ---------------------------------------------------------------------
    // EXTRAER CORREO DESDE TOKEN
    // ---------------------------------------------------------------------
    public String getCorreoDesdeToken(String token) {
        try {
            return getAllClaims(token).getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    // ---------------------------------------------------------------------
    // EXTRAER ROL DESDE TOKEN
    // ---------------------------------------------------------------------
    public String getRolDesdeToken(String token) {
        try {
            return getAllClaims(token).get("rol", String.class);
        } catch (Exception e) {
            return null;
        }
    }

    // ---------------------------------------------------------------------
    // OBTENER TODOS LOS CLAIMS INTERNOS
    // ---------------------------------------------------------------------
    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
