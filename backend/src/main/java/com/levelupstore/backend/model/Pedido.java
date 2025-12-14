package com.levelupstore.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrdenDetalle> detalles;
    
    private Double total;
    private String estado; // "PENDIENTE", "CONFIRMADO", "ENVIADO"
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}