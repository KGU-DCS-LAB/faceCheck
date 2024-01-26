package com.dcs.faceCheckserver.auth.service;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.dto.SignUpRequestDTO;
import com.dcs.faceCheckserver.auth.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
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
//        return MemberResponseDto.of(memberRepository.save(member));
//    }

//    public TokenDto login(MemberRequestDto requestDto) {
//        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
//
//        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
//
//        return tokenProvider.generateTokenDto(authentication);
//    }
}
