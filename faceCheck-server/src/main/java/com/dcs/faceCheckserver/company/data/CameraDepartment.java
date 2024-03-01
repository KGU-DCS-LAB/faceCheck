package com.dcs.faceCheckserver.company.data;

import com.dcs.faceCheckserver.employee.data.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "camera_department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CameraDepartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "camera_id")
    private Camera camera;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
