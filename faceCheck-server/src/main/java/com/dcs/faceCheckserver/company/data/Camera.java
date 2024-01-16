package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "camera")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Camera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Department> department;

    public Camera(String name, List<Department> department) {
        this.name = name;
        this.department = department;
    }
}
