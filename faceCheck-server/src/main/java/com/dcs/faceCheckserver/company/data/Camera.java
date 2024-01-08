package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

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

    private String cameraName;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Camera(String cameraName) {
        this.cameraName = cameraName;
    }
}
