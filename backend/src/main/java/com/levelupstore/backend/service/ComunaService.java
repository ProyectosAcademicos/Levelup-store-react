package com.levelupstore.backend.service;

import com.levelupstore.backend.dto.ComunaDTO;
import com.levelupstore.backend.model.Comuna;
import com.levelupstore.backend.repository.ComunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ComunaService {

    @Autowired
    private ComunaRepository comunaRepository;

    public List<ComunaDTO> obtenerComunasPorRegion(Long regionId) {
        return comunaRepository.findByRegionId(regionId)
                .stream()
                .map(c -> new ComunaDTO(c.getId(), c.getNombre()))
                .toList();
    }
}

