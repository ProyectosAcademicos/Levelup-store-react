package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.ComunaDTO;
import com.levelupstore.backend.model.Comuna;
import com.levelupstore.backend.service.ComunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comunas")
public class ComunaController {

    @Autowired
    private ComunaService comunaService;

    @GetMapping("/region/{id}")
    public List<ComunaDTO> listarPorRegion(@PathVariable Long id) {
        return comunaService.obtenerComunasPorRegion(id);
    }
}
