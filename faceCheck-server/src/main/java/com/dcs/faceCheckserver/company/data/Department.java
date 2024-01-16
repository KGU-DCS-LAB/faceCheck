package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

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

//    @ManyToOne
//    private Camera camera;

    public Department(String department) {
        this.department = department;
    }
}
