package com.levelupstore.backend.dto;

import com.levelupstore.backend.model.EstadoOrden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private List<OrdenDetalleDTO> detalles;
    private BigDecimal total;
    private EstadoOrden estado;
    private String metodoPago;
    private String direccionEnvio;
    private String telefono;
    private String notas;
    private LocalDateTime creadoEn;
}