package com.dcs.faceCheckserver.company.repository;

import com.dcs.faceCheckserver.company.data.Camera;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CameraRepository extends JpaRepository<Camera, Long> {
    Optional<Camera> findByName(String name);
 }
