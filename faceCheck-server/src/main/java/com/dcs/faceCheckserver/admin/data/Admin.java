package com.dcs.faceCheckserver.admin.data;

import com.dcs.faceCheckserver.auth.entity.Authority;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String adminId;

    @Column(nullable = false)
    private String adminPassword;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Admin(String adminId, String adminPassword, Authority authority) {
        this.adminId = adminId;
        this.adminPassword = adminPassword;
        this.authority = authority;
    }
}
