package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "department")
@Getter
@Setter
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String department;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Department(String department) {
        this.department = department;
    }

    public Department() {

    }
}
