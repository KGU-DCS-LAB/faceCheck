package com.dcs.faceCheckserver.auth.dto;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class SignUpRequestDTO {
    private String name;
    private String memberId;
    private String memberPassword;
    private Authority authority;
    private List<String> cameraNames;

    public Admin toAdmin(PasswordEncoder passwordEncoder) {
        return Admin.builder()
                .adminId(memberId)
                .adminPassword(passwordEncoder.encode(memberPassword))
                .authority(Authority.ROLE_ADMIN)
                .build();
    }

    public Employee toEmployee(PasswordEncoder passwordEncoder) {
        return Employee.builder()
                .name(name)
                .employeeId(memberId)
                .employeePassword(passwordEncoder.encode(memberId))
                .number(memberId)
                .authority(Authority.ROLE_EMPLOYEE)
                .state("요청전")
                .build();
    }

    public Visitor toVisitor(PasswordEncoder passwordEncoder) {
        return Visitor.builder()
                .name(name)
                .visitorId(memberId)
                .visitorPassword(passwordEncoder.encode(memberId))
                .number(memberId)
                .authority(Authority.ROLE_VISITOR)
                .state("요청전")
                .build();
    }
}


