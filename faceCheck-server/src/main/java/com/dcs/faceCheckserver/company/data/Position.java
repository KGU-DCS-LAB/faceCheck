package com.dcs.faceCheckserver.company.data;

import com.dcs.faceCheckserver.employee.data.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "position")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;

    @OneToMany
    private List<Employee> employees;

    public Position(String position) {
        this.position = position;
    }
}
