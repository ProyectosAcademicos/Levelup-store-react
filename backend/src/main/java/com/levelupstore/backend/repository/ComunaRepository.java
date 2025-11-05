package com.levelupstore.backend.repository;

import com.levelupstore.backend.model.Comuna;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComunaRepository extends JpaRepository<Comuna, Long> {
    List<Comuna> findByRegionId(Long regionId);
}
