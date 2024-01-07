package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.data.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //관리자 회원가입
    @RequestMapping(value = "/admin/join", method = RequestMethod.POST)
    public boolean joinAdmin(@RequestBody AdminJoinRequestDTO adminRequestDTO) {
        return adminService.join(adminRequestDTO);
    }

    //관리자 로그인
    @RequestMapping(value = "/admin/login", method = RequestMethod.POST)
    public AdminLoginResponseDTO loginAdmin(@RequestBody AdminLoginDTO admin) {
        String adminId = admin.getAdminId();
        String adminPassword = admin.getAdminPassword();
        return adminService.login(adminId, adminPassword);
    }
}
