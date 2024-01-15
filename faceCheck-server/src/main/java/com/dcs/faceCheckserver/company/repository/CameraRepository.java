package com.dcs.faceCheckserver.company.repository;

import com.dcs.faceCheckserver.company.data.Camera;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CameraRepository extends JpaRepository<Camera, Long> {
    Camera findByName(String name);
}
