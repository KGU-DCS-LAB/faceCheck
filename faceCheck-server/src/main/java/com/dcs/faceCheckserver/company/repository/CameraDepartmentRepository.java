package com.dcs.faceCheckserver.company.repository;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.CameraDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CameraDepartmentRepository extends JpaRepository<CameraDepartment, Long> {
    void deleteByCamera(Optional<Camera> byId);
}
