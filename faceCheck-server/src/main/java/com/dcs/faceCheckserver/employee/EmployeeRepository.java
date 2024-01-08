package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.employee.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
