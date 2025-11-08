package com.levelupstore.backend.service;

import com.levelupstore.backend.dto.ComunaDTO;
import com.levelupstore.backend.model.Comuna;
import com.levelupstore.backend.repository.ComunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComunaService {

    @Autowired
    private ComunaRepository comunaRepository;

    public List<ComunaDTO> obtenerComunasPorRegion(Long regionId) {
        List<Comuna> comunas = comunaRepository.findAll()
                .stream()
                .filter(c -> c.getRegion().getId().equals(regionId))
                .toList();

        return comunas.stream()
                .map(c -> new ComunaDTO(c.getId(), c.getNombre()))
                .collect(Collectors.toList());
    }
}
