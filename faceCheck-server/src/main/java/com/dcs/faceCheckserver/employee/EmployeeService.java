package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.employee.dto.ApproveEmployeeRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, PositionRepository positionRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
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
        employeeRepository.save(employee);

        return ResponseEntity.ok("성공적으로 승인 요청되었습니다.");
    }
}
