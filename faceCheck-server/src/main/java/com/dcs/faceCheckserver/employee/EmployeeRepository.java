package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.employee.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByState(String state);

    Employee findByNumber(String number);

    Optional<Employee> findByEmployeeId(String employeeId);

    boolean existsByNumber(String number);
}
