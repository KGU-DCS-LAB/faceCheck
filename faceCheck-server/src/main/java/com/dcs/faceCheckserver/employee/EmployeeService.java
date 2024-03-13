package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.employee.dto.ApproveEmployeeRequestDTO;
import com.dcs.faceCheckserver.employee.dto.EmployeeMypageResponseDTO;
import com.dcs.faceCheckserver.image.Image;
import com.dcs.faceCheckserver.image.ImageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;
    private final ImageRepository imageRepository;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, PositionRepository positionRepository, ImageRepository imageRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
        this.imageRepository = imageRepository;
    }

    public ResponseEntity<String> approveEmployee(String employeeId, ApproveEmployeeRequestDTO approveEmployeeRequestDTO) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId).orElse(null);

        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("직원을 찾을 수 없습니다: " + employeeId);
        }


        Department department = departmentRepository.findByDepartment(approveEmployeeRequestDTO.getDepartment());
        if (department == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("부서를 찾을 수 없습니다: " + approveEmployeeRequestDTO.getDepartment());
        }

        Position position = positionRepository.findByPosition(approveEmployeeRequestDTO.getPosition());
        if (position == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("직책을 찾을 수 없습니다: " + approveEmployeeRequestDTO.getPosition());
        }

        employee.setDepartment(department);
        employee.setPosition(position);
        employee.setState("요청");

        Image mainImage = imageRepository.findByImageId(Long.valueOf(approveEmployeeRequestDTO.getMainImageId()));
        List<Image> openFaceImage = new ArrayList<>();
        for (String id: approveEmployeeRequestDTO.getOpenFaceImageId()) {
            openFaceImage.add(imageRepository.findByImageId(Long.valueOf(id)));
        }

        employee.setMainImage(mainImage);
        employee.setOpenFaceImage(openFaceImage);

        employeeRepository.save(employee);

        return ResponseEntity.ok("성공적으로 승인 요청되었습니다.");
    }

    public EmployeeMypageResponseDTO getMypage(String employeeId) {
        EmployeeMypageResponseDTO employeeMypageResponseDTO = new EmployeeMypageResponseDTO();
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException(employeeId + "에 대한 직원을 찾을 수 없습니다."));

        employeeMypageResponseDTO.setName(employee.getName());
        employeeMypageResponseDTO.setNumber(employee.getNumber());
        employeeMypageResponseDTO.setDepartment(employee.getDepartment().getDepartment());
        employeeMypageResponseDTO.setPosition(employee.getPosition().getPosition());
//        employeeMypageResponseDTO.setMainImageURL();
//        employeeMypageResponseDTO.setImagesURL();
//        employeeMypageResponseDTO.getRecord()

        return employeeMypageResponseDTO;
    }
}
