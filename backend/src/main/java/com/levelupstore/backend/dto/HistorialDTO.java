package com.levelupstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialDTO {
    private Long id;
    private String accion;
    private LocalDateTime fecha;
    private Long usuarioId;
}