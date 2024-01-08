package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.employee.data.EmployeeRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //직원 등록
    @RequestMapping(value = "/user/employee/create", method = RequestMethod.POST)
    public ResponseEntity<String> joinAdmin(@RequestBody EmployeeRequestDTO employeeRequestDTO) {
        employeeService.createEmployee(employeeRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body("성공적으로 등록되었습니다.");
    }
}
