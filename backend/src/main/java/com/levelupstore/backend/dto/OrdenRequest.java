package com.levelupstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenRequest {
    private List<OrdenItemRequest> items;
    private String direccionEnvio;
    private String telefono;
    private String metodoPago;
    private String notas;
    private BigDecimal total;
}