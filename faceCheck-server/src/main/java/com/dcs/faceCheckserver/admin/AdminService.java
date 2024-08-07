package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.dto.AdminApprovedEmployeeListDTO;
import com.dcs.faceCheckserver.admin.dto.AdminApprovedVisitorListDTO;
//import com.dcs.faceCheckserver.auth.service.AuthService;
import com.dcs.faceCheckserver.admin.dto.EmployeeRecordListDTO;
import com.dcs.faceCheckserver.admin.dto.VisitorRecordListDTO;
import com.dcs.faceCheckserver.company.data.CameraDepartment;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.employee.EmployeeRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.record.RecordRepository;
import com.dcs.faceCheckserver.record.data.Record;
import com.dcs.faceCheckserver.visitor.VisitorRepository;
import com.dcs.faceCheckserver.visitor.data.CameraVisitor;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final EmployeeRepository employeeRepository;
    private final VisitorRepository visitorRepository;
    private final CameraRepository cameraRepository;
    private final RecordRepository recordRepository;
//    private final AuthService authService;

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

    public List<AdminApprovedVisitorListDTO> getPendingApprovalVisitors() {
        return getVisitors(visitorRepository.findByState("요청"));
    }

    private List<AdminApprovedEmployeeListDTO> getEmployees(List<Employee> employees) {
        return employees.stream()
                .map(employee -> {
                    AdminApprovedEmployeeListDTO employeeDTO = new AdminApprovedEmployeeListDTO();
                    employeeDTO.setName(employee.getName());
                    employeeDTO.setNumber(employee.getNumber());
                    employeeDTO.setDepartment(employee.getDepartment().getDepartment());
                    employeeDTO.setPosition(employee.getPosition().getPosition());

                    List<String> cameraNames = employee.getDepartment().getCameraDepartments().stream()
                            .map(CameraDepartment::getCamera)
                            .map(Camera::getName)
                            .collect(Collectors.toList());

                    employeeDTO.setCamera(cameraNames);
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

                    List<String> cameraNames = visitor.getCameraVisitors().stream()
                            .map(CameraVisitor::getCamera)
                            .map(Camera::getName)
                            .collect(Collectors.toList());

                    visitorDTO.setCamera(cameraNames);
                    return visitorDTO;
                })
                .collect(Collectors.toList());
    }

    public String createEmployee(String name, String number) {
        Employee employee = new Employee(name, number, "요청");
        employeeRepository.save(employee);
        return "관리자 등록";
//        return authService.signupEmployee(new SignUpRequestDTO(name, number, number, Authority.ROLE_EMPLOYEE));
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
                .flatMap(Optional::stream)
                .filter(Objects::nonNull)
                .toList();

        // Visitor 객체 생성
        Visitor visitor = new Visitor();
        visitor.setName(name);
        visitor.setNumber(number);
        visitor.setCameraVisitors(new ArrayList<>());
        visitor.setState("요청전");
        visitor.setVisitorId(number);
        visitor.setVisitorPassword(number);

        // CameraVisitor를 생성하고 Visitor에 추가
        for (Camera camera : cameraList) {
            CameraVisitor cameraVisitor = new CameraVisitor();
            cameraVisitor.setCamera(camera);
            cameraVisitor.setVisitor(visitor);
            visitor.getCameraVisitors().add(cameraVisitor);
        }

        visitorRepository.save(visitor);
    }

    public boolean approveVisitor(String number) {
        Visitor visitorToApprove = visitorRepository.findByNumber(number);

        if (visitorToApprove != null) {
            visitorToApprove.setState("완료");
            visitorRepository.save(visitorToApprove);
            return true;
        }

        return false;
    }

    public List<EmployeeRecordListDTO> getEmployeeRecords() {
        //Record 중 employeeId가 null이 아닌 데이터만 가져오기
        List<Record> recordList = recordRepository.findByEmployeeIsNotNull();
        return convertToEmployeeDTOList(recordList);
    }

    private List<EmployeeRecordListDTO> convertToEmployeeDTOList(List<Record> recordList) {
        List<EmployeeRecordListDTO> dtoList = new ArrayList<>();
        for (Record record : recordList) {
            EmployeeRecordListDTO dto = new EmployeeRecordListDTO();

            Employee employee = record.getEmployee();
            dto.setName(employee.getName());
            dto.setNumber(employee.getNumber());
            dto.setDepartment(employee.getDepartment().getDepartment());
            dto.setPosition(employee.getPosition().getPosition());
            dto.setCamera(record.getCamera().getName());

            LocalDateTime dateTime = record.getDateTime();
            // DateTimeFormatter를 사용하여 원하는 형식으로 포맷 지정
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
            // LocalDateTime을 문자열로 포맷팅
            String formattedDateTime = dateTime.format(formatter);
            dto.setDate(formattedDateTime);

            dtoList.add(dto);
        }
        return dtoList;
    }

    public List<VisitorRecordListDTO> getVisitorRecords() {
        List<Record> recordList = recordRepository.findByVisitorIsNotNull();
        return convertToVisitorDTOList(recordList);
    }

    private List<VisitorRecordListDTO> convertToVisitorDTOList(List<Record> recordList) {
        List<VisitorRecordListDTO> dtoList = new ArrayList<>();
        for (Record record : recordList) {
            VisitorRecordListDTO dto = new VisitorRecordListDTO();

            Visitor visitor = record.getVisitor();
            dto.setName(visitor.getName());
            dto.setCamera(record.getCamera().getName());

            LocalDateTime dateTime = record.getDateTime();
            // DateTimeFormatter를 사용하여 원하는 형식으로 포맷 지정
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
            // LocalDateTime을 문자열로 포맷팅
            String formattedDateTime = dateTime.format(formatter);
            dto.setDate(formattedDateTime);

            dtoList.add(dto);
        }
        return dtoList;
    }
}
