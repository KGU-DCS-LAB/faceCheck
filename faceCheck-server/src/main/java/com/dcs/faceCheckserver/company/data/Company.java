package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    private String companyName;

//    @OneToMany(mappedBy = "company")
//    private List<Position> positions;
//
//    @OneToMany(mappedBy = "company")
//    private List<Department> departments;
//
//    @OneToMany(mappedBy = "company")
//    private List<Camera> cameras;
}
