package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.admin.data.AdminRequestDTO;
import com.dcs.faceCheckserver.company.Company;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
