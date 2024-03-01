package com.dcs.faceCheckserver.employee;

import com.dcs.faceCheckserver.employee.dto.ApproveEmployeeRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //직원 마이페이지 정보 조회
//    @RequestMapping(value = "/{employeeId}", method = RequestMethod.GET)
//    public EmployeeMypageResponseDTO getMypage(@PathVariable String employeeId) {
//        return employeeService.getMypage(employeeId);
//    }

    //정보 입력 후 승인 요청
    @RequestMapping(value = "/approve/{employeeId}", method = RequestMethod.POST)
    public ResponseEntity<String> approveEmployee(@PathVariable String employeeId, @RequestBody ApproveEmployeeRequestDTO approveEmployeeRequestDTO) {
        employeeService.approveEmployee(employeeId, approveEmployeeRequestDTO);
        return ResponseEntity.ok("성공적으로 승인 요청되었습니다.");
    }
}
