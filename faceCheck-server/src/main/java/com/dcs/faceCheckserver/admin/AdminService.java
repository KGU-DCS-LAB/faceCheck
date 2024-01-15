package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.dto.AdminApprovedEmployeeListDTO;
import com.dcs.faceCheckserver.admin.dto.AdminApprovedVisitorListDTO;
import com.dcs.faceCheckserver.company.CameraRepository;
import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.employee.EmployeeRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.visitor.VisitorRepository;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {
    private final AdminRepository adminRepository;
    private final EmployeeRepository employeeRepository;
    private final VisitorRepository visitorRepository;
    private final CameraRepository cameraRepository;

    public AdminService(AdminRepository adminRepository, EmployeeRepository employeeRepository, VisitorRepository visitorRepository, CameraRepository cameraRepository) {
        this.adminRepository = adminRepository;
        this.employeeRepository = employeeRepository;
        this.visitorRepository = visitorRepository;
        this.cameraRepository = cameraRepository;
    }

//    public boolean join(AdminJoinRequestDTO adminRequestDTO) {
//        String name = adminRequestDTO.getName();
//        String adminId = adminRequestDTO.getAdminId();
//        String adminPassword = adminRequestDTO.getAdminPassword();
//        String email = adminRequestDTO.getEmail();
//        String companyName = adminRequestDTO.getCompanyName();
//        List<String> companyPosition = adminRequestDTO.getCompanyPosition();
//        List<String> companyDepartment = adminRequestDTO.getCompanyDepartment();
//
//        Company company = new Company(companyName, companyPosition, companyDepartment);
//
//        //중복 확인
//        if (!validateDuplicateUser(adminId)) {
//            Admin admin = new Admin(name, adminId, adminPassword, email, company);
//            adminRepository.save(admin);
//            return true;
//        }
//
//        return false;
//    }
//
//    private boolean validateDuplicateUser(String adminId) {
//        if (adminRepository.existsByAdminId(adminId)) {
//            System.out.println("관리자 아이디가 중복되었습니다.");
//            return true;
//        }
//        return false;
//    }
//
//    public AdminLoginResponseDTO login(String adminId, String adminPassword) {
//
//        Admin authenticatedAdmin = adminRepository.findByAdminId(adminId);
//
//        if (authenticatedAdmin == null) {
//            System.out.println("존재하지 않는 아이디 입니다.");
//            return null;
//        }
//
//        if (Objects.equals(authenticatedAdmin.getAdminPassword(), adminPassword)) {
//            return new AdminLoginResponseDTO(
//                    authenticatedAdmin.getId(),
//                    authenticatedAdmin.getAdminId(),
//                    authenticatedAdmin.getName()
//            );
//        }
//
//        System.out.println("잘못된 비밀번호입니다.");
//        return null;
//    }

    public List<AdminApprovedEmployeeListDTO> getAprrovedEmployeeList() {
        return getEmployees(employeeRepository.findByState("완료"));
    }

    public List<AdminApprovedEmployeeListDTO> getPendingApprovalEmployees() {
        return getEmployees(employeeRepository.findByState("요청"));
    }

    public List<AdminApprovedVisitorListDTO> getAprrovedVisitorList() {
        return getVisitors(visitorRepository.findByState("완료"));
    }

    private List<AdminApprovedEmployeeListDTO> getEmployees(List<Employee> employees) {
        return employees.stream()
                .map(employee -> {
                    AdminApprovedEmployeeListDTO employeeDTO = new AdminApprovedEmployeeListDTO();
                    employeeDTO.setName(employee.getName());
                    employeeDTO.setNumber(employee.getNumber());
                    employeeDTO.setDepartment(employee.getDepartment().getDepartment());
                    employeeDTO.setPosition(employee.getPosition().getPosition());
                    employeeDTO.setCamera(employee.getCameras().stream()
                            .findFirst()
                            .map(camera -> Collections.singletonList(camera.getCameraName()))
                            .orElse(Collections.emptyList()));
                    return employeeDTO;
                })
                .collect(Collectors.toList());
    }

    private List<AdminApprovedVisitorListDTO> getVisitors(List<Visitor> visitors) {
        return visitors.stream()
                .map(visitor -> {
                    AdminApprovedVisitorListDTO visitorDTO = new AdminApprovedVisitorListDTO();
                    visitorDTO.setName(visitor.getName());
                    visitorDTO.setNumber(visitor.getNumber());
                    visitorDTO.setVisitPurpose(visitor.getVisitPurpose());
                    visitorDTO.setCamera(visitor.getCameras().stream()
                            .findFirst()
                            .map(camera -> Collections.singletonList(camera.getCameraName()))
                            .orElse(Collections.emptyList()));
                    return visitorDTO;
                })
                .collect(Collectors.toList());
    }

    public void createEmployee(String name, String number) {
        Employee employee = new Employee(name, number, "요청전");
        employeeRepository.save(employee);
    }

    public boolean approveEmployee(String number) {
        Employee employeeToApprove = employeeRepository.findByNumber(number);

        if (employeeToApprove != null) {
            // 직원 승인 처리
            employeeToApprove.setState("완료");
            employeeRepository.save(employeeToApprove);
            return true;
        }

        return false;
    }

    public void createVisitor(String name, String number, List<String> cameras) {
        List<Camera> cameraList = cameras.stream()
                .map(cameraRepository::findByName)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        // Visitor 객체 생성
        Visitor visitor = new Visitor(name, number, cameraList);
        visitorRepository.save(visitor);
    }
}
