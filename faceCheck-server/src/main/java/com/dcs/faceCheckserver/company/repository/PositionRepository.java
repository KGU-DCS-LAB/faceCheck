package com.dcs.faceCheckserver.company.repository;

import com.dcs.faceCheckserver.company.data.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Position findByPosition(String position);
}
