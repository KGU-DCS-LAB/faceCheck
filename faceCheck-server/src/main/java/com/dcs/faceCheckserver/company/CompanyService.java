package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.CameraDepartment;
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
                    List<String> cameraDepartmentsName = camera.getCameraDepartments().stream()
                            .map(CameraDepartment::getDepartment)
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
        List<CameraDepartment> cameraDepartments = new ArrayList<>();
        Camera camera = new Camera(cameraName); // 카메라 객체 생성

        for (String departmentName: departmentsName) {
            Department department = departmentRepository.findByDepartment(departmentName);
            if (department == null) {
                // 부서를 찾지 못한 경우에 대한 예외 처리
                throw new RuntimeException("부서를 찾을 수 없습니다: " + departmentName);
            }
            CameraDepartment cameraDepartment = new CameraDepartment();
            cameraDepartment.setDepartment(department);
            cameraDepartment.setCamera(camera); // 카메라 객체 설정
            cameraDepartments.add(cameraDepartment);
        }

        camera.setCameraDepartments(cameraDepartments); // 카메라 객체에 카메라 부서 설정

        cameraRepository.save(camera); // 카메라 저장
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

    public void updatePosition(String originalPositionName, String updatePositionName) {
        Position position = positionRepository.findByPosition(originalPositionName);

        // 직급이 존재하지 않는 경우 에러 처리
        if (position == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "직급을 찾을 수 없습니다: " + originalPositionName);
        }

        // 수정된 직급 이름으로 업데이트합니다.
        position.setPosition(updatePositionName);
        positionRepository.save(position);
    }

    public void updateCamera(String originalCameraName, String updateCameraName, List<String> changeDepartmentNames) {
        Camera camera = cameraRepository.findByName(originalCameraName);

        // 카메라가 존재하지 않는 경우 에러 처리
        if (camera == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "카메라를 찾을 수 없습니다: " + originalCameraName);
        }

        // 수정된 카메라 이름으로 업데이트합니다.
        camera.setName(updateCameraName);

        // 기존의 카메라 부서를 모두 삭제합니다.
        camera.getCameraDepartments().clear();

        // 변경된 부서에 대한 새로운 카메라 부서를 추가합니다.
        for (String changeDepartmentName : changeDepartmentNames) {
            CameraDepartment newCameraDepartment = new CameraDepartment();
            newCameraDepartment.setCamera(camera);
            Department department = departmentRepository.findByDepartment(changeDepartmentName);
            newCameraDepartment.setDepartment(department);
            camera.getCameraDepartments().add(newCameraDepartment);
        }

        // 수정된 부서로 업데이트합니다.
        cameraRepository.save(camera);
    }

}
