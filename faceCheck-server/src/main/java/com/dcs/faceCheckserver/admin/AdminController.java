package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.dto.*;
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
}
