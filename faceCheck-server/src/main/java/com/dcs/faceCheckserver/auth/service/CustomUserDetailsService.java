package com.dcs.faceCheckserver.auth.service;

import com.dcs.faceCheckserver.admin.AdminRepository;
import com.dcs.faceCheckserver.admin.data.Admin;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adminRepository.findByAdminId(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
    }

    private UserDetails createUserDetails(Admin admin) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(admin.getAuthority().toString());

        return new User(
                String.valueOf(admin.getId()),
                admin.getAdminPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
