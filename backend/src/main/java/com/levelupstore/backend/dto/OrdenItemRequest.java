package com.levelupstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenItemRequest {
    private Long productoId;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}