package com.levelupstore.backend.service;

import com.levelupstore.backend.dto.RegionDTO;
import com.levelupstore.backend.model.Region;
import com.levelupstore.backend.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public List<RegionDTO> obtenerTodasLasRegiones() {
        return regionRepository.findAll()
                .stream()
                .map(r -> new RegionDTO(r.getId(), r.getNombre()))
                .toList();
    }
}

