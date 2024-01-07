package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.admin.data.AdminLoginResponseDTO;
import com.dcs.faceCheckserver.admin.data.AdminJoinRequestDTO;
import com.dcs.faceCheckserver.company.data.Company;
import jakarta.persistence.NonUniqueResultException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Admin admin = new Admin(name, adminId, adminPassword, email, company);

        adminRepository.save(admin);
        return true;
    }

    public AdminLoginResponseDTO login(String adminId, String adminPassword) {
        try {
            // adminId와 일치하는 모든 관리자 검색
            List<Admin> admins = adminRepository.findByAdminId(adminId);

            if (!admins.isEmpty()) {
                // 검색된 관리자 중에서 adminPassword와 일치하는 것을 찾음
                Admin loggedInAdmin = admins.stream()
                        .filter(admin -> admin.getAdminPassword().equals(adminPassword))
                        .findFirst()
                        .orElse(null);

                if (loggedInAdmin != null) {
                    // 관리자를 찾은 경우 AdminLoginResponseDTO 생성 및 반환
                    return new AdminLoginResponseDTO(loggedInAdmin.getId(), loggedInAdmin.getAdminId(), loggedInAdmin.getName());
                } else {
                    // 관리자를 찾지 못한 경우
                    System.out.println("비밀번호가 일치하지 않음");
                    return null;
                }
            } else {
                // 결과가 없는 경우
                System.out.println("사용자를 찾을 수 없음");
                return null;
            }
        } catch (NonUniqueResultException e) {
            // 여러 결과가 있는 경우
            System.out.println("여러 사용자를 찾음");
            return null;
        }
    }
}
