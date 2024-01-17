package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.employee.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByState(String state);

    Employee findByNumber(String number);

    Employee findByEmployeeId(String employeeId);
}
