package com.dcs.faceCheckserver.company.data;

import com.dcs.faceCheckserver.visitor.data.CameraVisitor;
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

    @OneToMany(mappedBy = "camera", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CameraDepartment> cameraDepartments; //출입 가능 부서

    @OneToMany(mappedBy = "camera", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CameraVisitor> cameraVisitors;

    public Camera(String cameraName) {
        this.name = cameraName;
    }
}
