package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.admin.AdminRepository;
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
}
