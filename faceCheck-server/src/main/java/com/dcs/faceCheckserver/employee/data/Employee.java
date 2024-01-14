package com.dcs.faceCheckserver.employee.data;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; //직원 이름
    private String number; //직원 번호
    private boolean state; //승인된 직원은 true, 승인 전 직원은 false

    @ManyToOne
    private Department department; //부서

    @ManyToOne
    private Position position; //직급

    @ManyToMany
    private List<Camera> cameras;

    public Employee(String name, String number, Department department, Position position, List<Camera> cameras) {
        this.name = name;
        this.number = number;
        this.department = department;
        this.position = position;
        this.cameras = cameras;
    }

    public Employee(String name, String number, boolean state) {
        this.name = name;
        this.number = number;
        this.state = state;
    }
}
