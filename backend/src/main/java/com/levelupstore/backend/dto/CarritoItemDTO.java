package com.levelupstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItemDTO {
    private Long id;
    private Long productoId;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagenUrl;
    private String imagenFile;
    private Integer cantidad;
    private BigDecimal subtotal;
}