package com.dcs.faceCheckserver.auth.dto;

import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpRequestDTO {
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

//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        return new UsernamePasswordAuthenticationToken(email, password);
//    }
}


