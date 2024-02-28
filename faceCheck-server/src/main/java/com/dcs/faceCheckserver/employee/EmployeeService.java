package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.employee.dto.ApproveEmployeeRequestDTO;
import org.springframework.stereotype.Service;

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

    public void approveEmployee(String employeeId, ApproveEmployeeRequestDTO approveEmployeeRequestDTO) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElse(new Employee()); // 빈 Employee 객체를 기본값으로 사용

        employee.setDepartment(departmentRepository.findByDepartment(approveEmployeeRequestDTO.getDepartment()));
        employee.setPosition(positionRepository.findByPosition(approveEmployeeRequestDTO.getPosition()));
        employeeRepository.save(employee);
    }
}
