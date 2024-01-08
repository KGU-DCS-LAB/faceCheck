package com.dcs.faceCheckserver.admin.data;

import com.dcs.faceCheckserver.company.data.Company;
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

    private String name;
    private String adminId;
    private String adminPassword;
    private String email;

    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL)
    private Company company;

    public Admin(String name, String adminId, String adminPassword, String email, Company company) {
        this.name = name;
        this.adminId = adminId;
        this.adminPassword = adminPassword;
        this.email = email;
        this.company = company;
    }
}
