package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.admin.data.AdminRequestDTO;
import com.dcs.faceCheckserver.company.Company;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean join(AdminRequestDTO adminRequestDTO) {
        String name = adminRequestDTO.getName();
        String adminId = adminRequestDTO.getAdminId();
        String adminPassword = adminRequestDTO.getAdminPassword();
        String email = adminRequestDTO.getEmail();
        String companyName = adminRequestDTO.getCompanyName();
        List<String> companyPosition = adminRequestDTO.getCompanyPosition();
        List<String> companyDepartment = adminRequestDTO.getCompanyDepartment();

        Company company = new Company(companyName, companyPosition, companyDepartment);
        Admin admin = new Admin(name, adminId, adminPassword, email, company);

        adminRepository.save(admin);
        return true;
    }
}
