package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.data.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByAdminId(String adminId);
}
