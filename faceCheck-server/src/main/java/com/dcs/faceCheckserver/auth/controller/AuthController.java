package com.dcs.faceCheckserver.auth.controller;

import com.dcs.faceCheckserver.auth.dto.LoginRequestDTO;
import com.dcs.faceCheckserver.auth.dto.SignUpRequestDTO;
import com.dcs.faceCheckserver.auth.dto.TokenDTO;
import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signupAdmin(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        Authority authority = signUpRequestDTO.getAuthority();

        if (Authority.ROLE_ADMIN.equals(authority)) {
            return ResponseEntity.ok(authService.signupAdmin(signUpRequestDTO));
        } else if (Authority.ROLE_EMPLOYEE.equals(authority)) {
            return ResponseEntity.ok(authService.signupEmployee(signUpRequestDTO));
        } else {
            return ResponseEntity.ok(authService.signupVisitor(signUpRequestDTO));
        }

    }


    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        TokenDTO tokenDTO = authService.login(loginRequestDTO);
        if (tokenDTO != null) {
            return ResponseEntity.ok(tokenDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
