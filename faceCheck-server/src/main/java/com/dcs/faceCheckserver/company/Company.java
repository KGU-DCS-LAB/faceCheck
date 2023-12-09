package com.dcs.faceCheckserver.company;

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

    private String name;

    @ElementCollection
    private List<String> positions;

    @ElementCollection
    private List<String> departments;

    public Company(String name, List<String> positions, List<String> departments) {
        this.name = name;
        this.positions = positions;
        this.departments = departments;
    }
}
