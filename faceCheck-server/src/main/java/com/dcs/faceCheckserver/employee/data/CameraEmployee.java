package com.dcs.faceCheckserver.employee.data;

import com.dcs.faceCheckserver.company.data.Camera;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "camera_employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CameraEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "camera_id")
    private Camera camera;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
