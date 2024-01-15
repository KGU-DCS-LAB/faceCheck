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

    @OneToMany(mappedBy = "camera")
    private List<Department> department;
}
