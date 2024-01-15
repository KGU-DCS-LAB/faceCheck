package com.dcs.faceCheckserver.visitor.data;

import com.dcs.faceCheckserver.company.data.Camera;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "visitor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String number;
    private String visitPurpose;
    private String state; //요청전, 요청, 완료

    @ManyToMany
    private List<Camera> cameras;

    public Visitor(String number, String visitPurpose, List<Camera> cameras) {
        this.number = number;
        this.visitPurpose = visitPurpose;
        this.cameras = cameras;
    }
}
