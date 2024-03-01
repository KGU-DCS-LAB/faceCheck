package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.company.dto.AllCompaniesDTO;
import com.dcs.faceCheckserver.company.dto.CameraDTO;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public void createDepartment(List<String> departmentsName) {
        departmentsName.stream()
                .map(Department::new)
                .forEach(departmentRepository::save);

    }

    public void createCamera(String cameraName, List<String> departmentsName) {
        List<Department> departmentList = new ArrayList<>();
        for (String departmentName: departmentsName) {
            departmentList.add(departmentRepository.findByDepartment(departmentName));
        }

        Camera camera = new Camera(cameraName, departmentList);
        cameraRepository.save(camera);
    }

    public void createPosition(List<String> positionsName) {
        positionsName.stream()
                .map(Position::new)
                .forEach(positionRepository::save);
    }

    public void updateDepartment(String originalDepartmentName, String updatedDepartmentName) {
        Department department = departmentRepository.findByDepartment(originalDepartmentName);

        // 부서가 존재하지 않는 경우 에러 처리
        if (department == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "부서를 찾을 수 없습니다: " + originalDepartmentName);
        }

        // 수정된 부서 이름으로 업데이트합니다.
        department.setDepartment(updatedDepartmentName);
        departmentRepository.save(department);
    }
}
