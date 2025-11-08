package com.levelupstore.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levelupstore.backend.model.Comuna;
import com.levelupstore.backend.model.Region;
import com.levelupstore.backend.repository.ComunaRepository;
import com.levelupstore.backend.repository.RegionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class DataInitializer {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ComunaRepository comunaRepository;

    @PostConstruct
    public void init() {
        try {
            // 1️⃣ Cargar regiones
            if (regionRepository.count() == 0) {
                List<String> regiones = List.of(
                        "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
                        "Valparaíso", "Metropolitana de Santiago", "Libertador General Bernardo O’Higgins",
                        "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos",
                        "Aysén del General Carlos Ibáñez del Campo", "Magallanes y de la Antártica Chilena"
                );
                regiones.forEach(nombre -> regionRepository.save(new Region(null, nombre)));
                System.out.println("✅ Regiones cargadas correctamente");
            }

            // 2️⃣ Cargar comunas desde el JSON
            if (comunaRepository.count() == 0) {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = getClass().getResourceAsStream("/comunas.json");
                List<ComunaJson> comunasJson = mapper.readValue(inputStream, new TypeReference<>() {});

                for (ComunaJson c : comunasJson) {
                    Region region = regionRepository.findAll()
                            .stream()
                            .filter(r -> r.getNombre().equalsIgnoreCase(c.getRegion()))
                            .findFirst()
                            .orElse(null);

                    if (region != null) {
                        Comuna comuna = new Comuna(null, c.getNombre(), region);
                        comunaRepository.save(comuna);
                    }
                }

                System.out.println("✅ Comunas cargadas correctamente");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Clase auxiliar para mapear el JSON
    private static class ComunaJson {
        private String nombre;
        private String region;

        public String getNombre() {
            return nombre;
        }

        public String getRegion() {
            return region;
        }
    }
}
