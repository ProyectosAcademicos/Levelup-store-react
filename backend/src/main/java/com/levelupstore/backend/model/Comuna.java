package com.levelupstore.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comunas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comuna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    // 🔗 Cada comuna pertenece a una región
    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;
}
