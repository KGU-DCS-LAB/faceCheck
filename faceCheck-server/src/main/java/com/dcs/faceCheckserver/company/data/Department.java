package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Embeddable
@Entity(name = "department")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String department;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CameraDepartment> cameraDepartments; //출입 가능 카메라

    public Department(String department) {
        this.department = department;
    }
}
