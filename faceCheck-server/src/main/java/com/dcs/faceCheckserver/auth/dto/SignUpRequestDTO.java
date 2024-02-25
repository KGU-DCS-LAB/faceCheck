package com.dcs.faceCheckserver.auth.dto;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.employee.data.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpRequestDTO {
    private String name;
    private String memberId;
    private String memberPassword;
    private Authority authority;

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
                .authority(Authority.ROLE_USER)
                .state("요청전")
                .build();
    }
}


