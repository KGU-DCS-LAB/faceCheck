package com.dcs.faceCheckserver.auth.service;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.admin.data.Admin;
import com.dcs.faceCheckserver.employee.EmployeeRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final AdminRepository adminRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return adminRepository.findByAdminId(username)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));


        // 먼저 Admin 데이터베이스에서 조회를 시도합니다.
        return adminRepository.findByAdminId(username)
                .map(this::createUserDetails)
                .orElseGet(() -> {
                    // Admin 데이터베이스에서 조회가 실패한 경우 Employee 데이터베이스에서 조회합니다.
                    return employeeRepository.findByEmployeeId(username)
                            .map(this::createEmployeeUserDetails)
                            .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
                });
    }

    private UserDetails createUserDetails(Admin admin) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(admin.getAuthority().toString());

        return new User(
                String.valueOf(admin.getId()),
                admin.getAdminPassword(),
                Collections.singleton(grantedAuthority)
        );
    }

    private UserDetails createEmployeeUserDetails(Employee employee) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(employee.getAuthority().toString());

        return new User(
                String.valueOf(employee.getId()),
                employee.getEmployeePassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
