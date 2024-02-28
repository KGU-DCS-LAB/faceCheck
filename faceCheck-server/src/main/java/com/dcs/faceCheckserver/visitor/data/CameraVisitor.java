package com.dcs.faceCheckserver.visitor.data;

import com.dcs.faceCheckserver.company.data.Camera;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "camera_visitor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CameraVisitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "camera_id")
    private Camera camera;

    @ManyToOne
    @JoinColumn(name = "visitor_id")
    private Visitor visitor;

    public CameraVisitor(Camera camera, Visitor visitor) {
        this.camera = camera;
        this.visitor = visitor;
    }
}
