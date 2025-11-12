package com.levelupstore.backend.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private String rut;
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasena;
    private String telefono;
    private String direccion;
    private String rol;
    private Long regionId;
    private Long comunaId;
}
