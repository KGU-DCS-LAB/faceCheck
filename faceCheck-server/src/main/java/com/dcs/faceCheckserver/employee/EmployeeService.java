package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.company.repository.DepartmentRepository;
import com.dcs.faceCheckserver.company.repository.PositionRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.employee.dto.ApproveEmployeeRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AdminRepository adminRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    public EmployeeService(EmployeeRepository employeeRepository, AdminRepository adminRepository, DepartmentRepository departmentRepository, PositionRepository positionRepository) {
        this.employeeRepository = employeeRepository;
        this.adminRepository = adminRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
    }

//    public EmployeeMypageResponseDTO getMypage(String employeeId) {
//
//    }

    public void approveEmployee(String employeeId, ApproveEmployeeRequestDTO approveEmployeeRequestDTO) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        employee.setDepartment(departmentRepository.findByDepartment(approveEmployeeRequestDTO.getDepartment()));
        employee.setPosition(positionRepository.findByPosition(approveEmployeeRequestDTO.getPosition()));
        employeeRepository.save(employee);
    }
}
