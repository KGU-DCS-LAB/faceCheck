package com.dcs.faceCheckserver.auth.controller;

import com.dcs.faceCheckserver.auth.dto.LoginRequestDTO;
import com.dcs.faceCheckserver.auth.dto.SignUpRequestDTO;
import com.dcs.faceCheckserver.auth.dto.TokenDTO;
import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signupAdmin(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        Authority authority = signUpRequestDTO.getAuthority();

        if (Authority.ROLE_ADMIN.equals(authority)) {
            return ResponseEntity.ok(authService.signupAdmin(signUpRequestDTO));
        } else {
            return ResponseEntity.ok("관리자가 아닙니다.");
        }
    }

//    @PostMapping("/signup")
//    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
//        return ResponseEntity.ok(authService.signup(requestDto));
//    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return ResponseEntity.ok(authService.login(loginRequestDTO));
    }
}
