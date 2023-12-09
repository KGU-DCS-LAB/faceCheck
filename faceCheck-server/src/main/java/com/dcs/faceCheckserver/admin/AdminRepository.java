package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.admin.data.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByAdminId(String adminId);
}
