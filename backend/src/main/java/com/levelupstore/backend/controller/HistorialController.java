package com.levelupstore.backend.controller;

import com.levelupstore.backend.dto.HistorialDTO;
import com.levelupstore.backend.model.Historial;
import com.levelupstore.backend.repository.HistorialRepository;
import com.levelupstore.backend.service.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/historial")
public class HistorialController {
    @Autowired
    private HistorialService historialService;

    @PostMapping
    public ResponseEntity<HistorialDTO> crearHistorial(@RequestBody HistorialDTO historialDTO) {
        HistorialDTO nuevoHistorial = historialService.crearHistorial(historialDTO);
        return ResponseEntity.ok(nuevoHistorial);
    }

    @GetMapping
    public ResponseEntity<List<HistorialDTO>> obtenerTodosLosHistoriales() {
        List<HistorialDTO> historiales = historialService.obtenerTodosLosHistoriales();
        return ResponseEntity.ok(historiales);
    }
}