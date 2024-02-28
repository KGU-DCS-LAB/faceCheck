package com.dcs.faceCheckserver.visitor.data;

import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.company.data.Camera;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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

    private String visitorId;
    private String visitorPassword;

    private String name;
    private String number;
    private String visitPurpose;
    private String state; //요청전, 요청, 완료

    @OneToMany(mappedBy = "visitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CameraVisitor> cameraVisitors = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Visitor(String visitorId, String visitorPassword, String name, String number, Authority authority, String state) {
        this.visitorId = visitorId;
        this.visitorPassword = visitorPassword;
        this.name = name;
        this.number = number;
        this.authority = authority;
        this.state = state;
    }
}
