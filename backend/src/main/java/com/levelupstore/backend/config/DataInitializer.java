package com.levelupstore.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @PostConstruct
    public void init() {
        try {
            System.out.println("Saltando carga de regiones y comunas (data.sql las maneja).");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
