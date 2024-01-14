package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.dto.AdminApprovedEmployeeListDTO;
import com.dcs.faceCheckserver.admin.dto.AdminJoinRequestDTO;
import com.dcs.faceCheckserver.admin.dto.AdminLoginDTO;
import com.dcs.faceCheckserver.admin.dto.AdminLoginResponseDTO;
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
}
