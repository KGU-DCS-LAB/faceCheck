package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.dto.AllCompaniesDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
}
