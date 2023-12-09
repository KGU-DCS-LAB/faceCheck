package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.admin.data.AdminRequestDTO;
import com.dcs.faceCheckserver.admin.data.AdminResponseDTO;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //관리자 회원가입
    @RequestMapping(value = "/admin/join", method = RequestMethod.POST)
    public boolean joinAdmin(@RequestBody AdminRequestDTO adminRequestDTO) {
        return adminService.join(adminRequestDTO);
    }

    //관리자 로그인
    @RequestMapping(value = "/admin/login", method = RequestMethod.POST)
    public AdminResponseDTO loginAdmin(@RequestBody Map<String, String> admin) {
        String adminId = admin.get("adminId");
        String adminPassword = admin.get("adminPassword");
        return adminService.login(adminId, adminPassword);
    }
}
