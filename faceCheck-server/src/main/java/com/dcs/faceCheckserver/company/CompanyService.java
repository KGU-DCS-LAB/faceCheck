package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.company.dto.AllCompaniesDTO;
import com.dcs.faceCheckserver.company.dto.CameraDTO;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CameraRepository cameraRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    public CompanyService(CameraRepository cameraRepository, DepartmentRepository departmentRepository, PositionRepository positionRepository) {
        this.cameraRepository = cameraRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
    }


    public AllCompaniesDTO getAllCompanies() {
        List<String> departmentsName = departmentRepository.findAll().stream()
                .map(Department::getDepartment)
                .collect(Collectors.toList());

        List<String> positionsName = positionRepository.findAll().stream()
                .map(Position::getPosition)
                .collect(Collectors.toList());

        List<CameraDTO> cameraDTOS = cameraRepository.findAll().stream()
                .map(camera -> {
                    String name = camera.getName();
                    List<String> cameraDepartmentsName = camera.getDepartment().stream()
                            .map(Department::getDepartment)
                            .collect(Collectors.toList());
                    return new CameraDTO(name, cameraDepartmentsName);
                })
                .collect(Collectors.toList());

        return new AllCompaniesDTO(departmentsName, positionsName, cameraDTOS);
    }
}
