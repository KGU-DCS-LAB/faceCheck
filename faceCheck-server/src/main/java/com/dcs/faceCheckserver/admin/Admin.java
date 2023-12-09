package com.dcs.faceCheckserver.admin;

import com.dcs.faceCheckserver.company.Company;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "admin")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String adminId;
    private String adminPassword;

    @ManyToOne
    private Company company;

    public Admin(String name, String adminId, String adminPassword, Company company) {
        this.name = name;
        this.adminId = adminId;
        this.adminPassword = adminPassword;
        this.company = company;
    }
}
