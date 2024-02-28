package com.dcs.faceCheckserver.auth.service;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.auth.dto.LoginRequestDTO;
import com.dcs.faceCheckserver.auth.dto.SignUpRequestDTO;
import com.dcs.faceCheckserver.auth.dto.TokenDTO;
import com.dcs.faceCheckserver.auth.jwt.TokenProvider;
import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import com.dcs.faceCheckserver.employee.EmployeeRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.visitor.VisitorRepository;
import com.dcs.faceCheckserver.visitor.data.CameraVisitor;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final AdminRepository adminRepository;
    private final EmployeeRepository employeeRepository;
    private final VisitorRepository visitorRepository;
    private final CameraRepository cameraRepository;
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

    public String signupEmployee(SignUpRequestDTO signUpRequestDTO) {
        if (employeeRepository.existsByNumber(signUpRequestDTO.getMemberId())) {
            throw new RuntimeException("이미 가입되어 있는 직원입니다.");
        }
        Employee employee = signUpRequestDTO.toEmployee(passwordEncoder);
        employeeRepository.save(employee);
        return "직원이 성공적으로 가입되었습니다.";
    }

    public String signupVisitor(SignUpRequestDTO signUpRequestDTO) {
        if (visitorRepository.existsByNumber(signUpRequestDTO.getMemberId())) {
            throw new RuntimeException("이미 가입되어 있는 방문자입니다.");
        }
        Visitor visitor = signUpRequestDTO.toVisitor(passwordEncoder);
        visitorRepository.save(visitor);

        List<CameraVisitor> cameraVisitors = new ArrayList<>();
        List<String> cameraNames = signUpRequestDTO.getCameraNames();
        for (String cameraName: cameraNames) {
            Camera camera = cameraRepository.findByName(cameraName);
            CameraVisitor cameraVisitor = new CameraVisitor(camera, visitor);
            cameraVisitors.add(cameraVisitor);
        }

        visitor.setCameraVisitors(cameraVisitors);
        visitorRepository.save(visitor); // 방문자 정보 업데이트

        return "방문자가 성공적으로 가입되었습니다.";
    }


    public TokenDTO login(LoginRequestDTO loginRequestDTO) {
        try {
            // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken = loginRequestDTO.toAuthentication();
            System.out.println(authenticationToken);

            // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
            //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 토큰 발급
            return tokenProvider.generateTokenDto(authentication);
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
            e.printStackTrace();
            // 로그인 실패
            return null;
        }
    }
}
