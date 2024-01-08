package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.employee.data.EmployeeRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AdminRepository adminRepository;

    public EmployeeService(EmployeeRepository employeeRepository, AdminRepository adminRepository) {
        this.employeeRepository = employeeRepository;
        this.adminRepository = adminRepository;
    }

    public void createEmployee(EmployeeRequestDTO employeeRequestDTO) {
        String name = employeeRequestDTO.getName();
        List<String> camera = employeeRequestDTO.getCamera();
        String departmentStr = employeeRequestDTO.getDepartment();
        String positionStr = employeeRequestDTO.getPosition();
        String number = employeeRequestDTO.getNumber();
        Long mainImageId = employeeRequestDTO.getMainImageId();
        List<Long> imagesId = employeeRequestDTO.getImagesId();
        String adminId = employeeRequestDTO.getAdminId();

        Department department = new Department(departmentStr);
        Position position = new Position(positionStr);

        List<Camera> cameras = camera.stream()
                .map(Camera::new)
                .collect(Collectors.toList());

        Employee employee = new Employee(name, number, department, position, cameras, adminRepository.findByAdminId(adminId));
        employeeRepository.save(employee);
    }
}
