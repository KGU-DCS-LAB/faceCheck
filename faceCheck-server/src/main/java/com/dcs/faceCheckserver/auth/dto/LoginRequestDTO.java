package com.dcs.faceCheckserver.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequestDTO {
    private String memberId;
    private String memberPassword;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(memberId, memberPassword);
    }
}
