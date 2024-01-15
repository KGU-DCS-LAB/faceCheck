package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    private Camera camera;
}
