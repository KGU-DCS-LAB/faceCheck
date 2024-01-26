package com.dcs.faceCheckserver.auth.service;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.dto.LoginRequestDTO;
import com.dcs.faceCheckserver.auth.dto.SignUpRequestDTO;
import com.dcs.faceCheckserver.auth.dto.TokenDTO;
import com.dcs.faceCheckserver.auth.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public String signupAdmin(SignUpRequestDTO signUpRequestDTO) {
        if (adminRepository.existsByAdminId(signUpRequestDTO.getMemberId())) {
            throw new RuntimeException("이미 가입되어 있는 관리자입니다.");
        }

        Admin admin = signUpRequestDTO.toAdmin(passwordEncoder);
        adminRepository.save(admin);
        return "관리자가 성공적으로 가입되었습니다.";
    }

//    public MemberResponseDto signup(MemberRequestDto requestDto) {
//        if (memberRepository.existsByEmail(requestDto.getEmail())) {
//            throw new RuntimeException("이미 가입되어 있는 유저입니다");
//        }
//
//        Member member = requestDto.toMember(passwordEncoder);
//        Member member = requestDto.toMember(passwordEncoder);
//        return MemberResponseDto.of(memberRepository.save(member));
//    }

    public TokenDTO login(LoginRequestDTO loginRequestDTO) {
        try {
            // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken = loginRequestDTO.toAuthentication();
            // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
            //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 토큰 발급
            return tokenProvider.generateTokenDto(authentication);
        } catch (AuthenticationException e) {
            // 로그인 실패
            return null;
        }
    }
}
