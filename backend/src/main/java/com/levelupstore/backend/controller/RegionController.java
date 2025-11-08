package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.RegionDTO;
import com.levelupstore.backend.model.Region;
import com.levelupstore.backend.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/regiones")
@CrossOrigin(origins = "http://localhost:5173")
public class RegionController {

    @Autowired
    private RegionService regionService;

    @GetMapping
    public List<RegionDTO> listarRegiones() {
        return regionService.obtenerTodasLasRegiones();
    }
}
