package com.dcs.faceCheckserver.company.repository;

import com.dcs.faceCheckserver.company.data.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByDepartment(String departmentName);
}
