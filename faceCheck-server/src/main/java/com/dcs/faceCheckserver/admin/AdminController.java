package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

//    //관리자 회원가입
//    @RequestMapping(value = "/join", method = RequestMethod.POST)
//    public boolean joinAdmin(@RequestBody AdminJoinRequestDTO adminRequestDTO) {
//        return adminService.join(adminRequestDTO);
//    }
//
//    //관리자 로그인
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public AdminLoginResponseDTO loginAdmin(@RequestBody AdminLoginDTO admin) {
//        String adminId = admin.getAdminId();
//        String adminPassword = admin.getAdminPassword();
//        return adminService.login(adminId, adminPassword);
//    }

    //승인된 직원 전체 리스트 조회
    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    public List<AdminApprovedEmployeeListDTO> approvedEmployeeList() {
        return adminService.getAprrovedEmployeeList();
    }

    //직원 등록
    @RequestMapping(value = "/employee/create", method = RequestMethod.POST)
    public ResponseEntity<String> createEmployee(@RequestBody CreateEmployeeRequestDTO createEmployeeRequestDTO) {
        String name = createEmployeeRequestDTO.getName();
        String number = createEmployeeRequestDTO.getNumber();

        adminService.createEmployee(name, number);

        return ResponseEntity.ok("직원이 성공적으로 등록되었습니다.");
    }

    //직원 승인 대기 리스트 조회
    @RequestMapping(value = "/employee/approve", method = RequestMethod.GET)
    public List<AdminApprovedEmployeeListDTO> getPendingApprovalEmployees() {
        return adminService.getPendingApprovalEmployees();
    }

    //직원 승인
    @RequestMapping(value = "/employee/approve/{number}", method = RequestMethod.POST)
    public ResponseEntity<String> approveEmployee(@PathVariable String number) {
        if (adminService.approveEmployee(number)) {
            return ResponseEntity.ok("성공적으로 승인되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 number의 직원이 존재하지 않습니다.");
    }

    //승인된 방문자 전체 리스트 조회
    @RequestMapping(value = "/visitor", method = RequestMethod.GET)
    public List<AdminApprovedVisitorListDTO> approvedVisitorList() {
        return adminService.getAprrovedVisitorList();
    }
}
