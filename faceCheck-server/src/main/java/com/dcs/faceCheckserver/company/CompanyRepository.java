package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.data.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
