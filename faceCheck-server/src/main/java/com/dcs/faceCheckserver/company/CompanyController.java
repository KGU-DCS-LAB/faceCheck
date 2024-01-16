package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.dto.AllCompaniesDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    //회사 정보 전체 조회
    @RequestMapping(value = "/company", method = RequestMethod.GET)
    public AllCompaniesDTO getAllCompanies() {
        return companyService.getAllCompanies();
    }

    //부서 등록
    @RequestMapping(value = "/department/create", method = RequestMethod.POST)
    public ResponseEntity<String> createDepartment(@RequestBody Map<String, List<String>> requestBody) {
        List<String> departmentsName = requestBody.get("department");
        companyService.createDepartment(departmentsName);
        return ResponseEntity.ok("부서가 성공적으로 등록되었습니다.");
    }
}
