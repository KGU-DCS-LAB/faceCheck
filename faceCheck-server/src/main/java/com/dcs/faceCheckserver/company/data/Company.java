package com.dcs.faceCheckserver.company.data;

import com.dcs.faceCheckserver.admin.data.Admin;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Entity(name = "company")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    private String companyName;

    @OneToMany(mappedBy = "company")
    private List<Position> positions;

    @OneToMany(mappedBy = "company")
    private List<Department> departments;

    @OneToMany(mappedBy = "company")
    private List<Camera> cameras;

    public Company(String companyName, List<String> positions, List<String> departments) {
        this.companyName = companyName;

        this.positions = positions.stream()
                .map(Position::new)
                .collect(Collectors.toList());

        this.departments = departments.stream()
                .map(Department::new)
                .collect(Collectors.toList());
    }
}
