package com.dcs.faceCheckserver.admin;


import com.dcs.faceCheckserver.admin.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //승인된 직원 전체 리스트 조회
    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    public List<AdminApprovedEmployeeListDTO> approvedEmployeeList() {
        return adminService.getAprrovedEmployeeList();
    }

    //직원 승인 대기 리스트 조회
    @RequestMapping(value = "/employee/approve", method = RequestMethod.GET)
    public List<AdminApprovedEmployeeListDTO> getPendingApprovalEmployees() {
        return adminService.getPendingApprovalEmployees();
    }

    //직원 승인
    @RequestMapping(value = "/employee/approve/{number}", method = RequestMethod.POST)
    public ResponseEntity<String> approveEmployee(@PathVariable String number) {
        if (adminService.approveEmployee(number)) {
            return ResponseEntity.ok("성공적으로 승인되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 number의 직원이 존재하지 않습니다.");
    }

    //승인된 방문자 전체 리스트 조회
    @RequestMapping(value = "/visitor", method = RequestMethod.GET)
    public List<AdminApprovedVisitorListDTO> approvedVisitorList() {
        return adminService.getAprrovedVisitorList();
    }

    //방문자 승인 대기 리스트 조회
    @RequestMapping(value = "/visitor/approve", method = RequestMethod.GET)
    public List<AdminApprovedVisitorListDTO> getPendingApprovalVisitors() {
        return adminService.getPendingApprovalVisitors();
    }

    //방문자 승인
    @RequestMapping(value = "/visitor/approve/{number}", method = RequestMethod.POST)
    public ResponseEntity<String> approveVisitor(@PathVariable String number) {
        if (adminService.approveVisitor(number)) {
            return ResponseEntity.ok("성공적으로 승인되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 number의 방문자가 존재하지 않습니다.");
    }

    //직원 출입 기록 조회
    @RequestMapping(value = "/employee/records", method = RequestMethod.GET)
    public List<EmployeeRecordListDTO> getEmployeeRecords() {
        return adminService.getEmployeeRecords();
    }

    //방문자 출입 기록 조회
    @RequestMapping(value = "/visitor/records", method = RequestMethod.GET)
    public List<VisitorRecordListDTO> getVisitorRecords() {
        return adminService.getVisitorRecords();
    }
}
