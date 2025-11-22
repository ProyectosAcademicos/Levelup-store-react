package com.levelupstore.backend.service;

import com.levelupstore.backend.dto.HistorialDTO;
import com.levelupstore.backend.model.Historial;
import com.levelupstore.backend.model.Usuario;
import com.levelupstore.backend.repository.HistorialRepository;
import com.levelupstore.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class HistorialService {

    @Autowired
    private HistorialRepository historialRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public HistorialDTO crearHistorial(HistorialDTO historialDTO) {
        Historial historial = new Historial();
        historial.setAccion(historialDTO.getAccion());
        historial.setFecha(LocalDateTime.now());

        Usuario usuario = usuarioRepository.findById(historialDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        historial.setUsuario(usuario);

        Historial nuevoHistorial = historialRepository.save(historial);
        historialDTO.setId(nuevoHistorial.getId());
        historialDTO.setFecha(nuevoHistorial.getFecha());
        return historialDTO;
    }

    public List<HistorialDTO> obtenerTodosLosHistoriales() {
        List<Historial> historiales = historialRepository.findAll();
        return historiales.stream().map(historial -> {
            HistorialDTO dto = new HistorialDTO();
            dto.setId(historial.getId());
            dto.setAccion(historial.getAccion());
            dto.setFecha(historial.getFecha());
            dto.setUsuarioId(historial.getUsuario().getId());
            return dto;
        }).collect(Collectors.toList());
    }
}