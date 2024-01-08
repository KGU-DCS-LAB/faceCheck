package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.admin.data.AdminLoginResponseDTO;
import com.dcs.faceCheckserver.admin.data.AdminJoinRequestDTO;
import com.dcs.faceCheckserver.company.data.Company;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean join(AdminJoinRequestDTO adminRequestDTO) {
        String name = adminRequestDTO.getName();
        String adminId = adminRequestDTO.getAdminId();
        String adminPassword = adminRequestDTO.getAdminPassword();
        String email = adminRequestDTO.getEmail();
        String companyName = adminRequestDTO.getCompanyName();
        List<String> companyPosition = adminRequestDTO.getCompanyPosition();
        List<String> companyDepartment = adminRequestDTO.getCompanyDepartment();

        Company company = new Company(companyName, companyPosition, companyDepartment);

        //중복 확인
        if (!validateDuplicateUser(adminId)) {
            Admin admin = new Admin(name, adminId, adminPassword, email, company);
            adminRepository.save(admin);
            return true;
        }

        return false;
    }

    private boolean validateDuplicateUser(String adminId) {
        if (adminRepository.existsByAdminId(adminId)) {
            System.out.println("관리자 아이디가 중복되었습니다.");
            return true;
        }
        return false;
    }

    public AdminLoginResponseDTO login(String adminId, String adminPassword) {

        Admin authenticatedAdmin = adminRepository.findByAdminId(adminId);

        if (authenticatedAdmin == null) {
            System.out.println("존재하지 않는 아이디 입니다.");
            return null;
        }

        if (Objects.equals(authenticatedAdmin.getAdminPassword(), adminPassword)) {
            return new AdminLoginResponseDTO(
                    authenticatedAdmin.getId(),
                    authenticatedAdmin.getAdminId(),
                    authenticatedAdmin.getName()
            );
        }

        System.out.println("잘못된 비밀번호입니다.");
        return null;
    }
}
