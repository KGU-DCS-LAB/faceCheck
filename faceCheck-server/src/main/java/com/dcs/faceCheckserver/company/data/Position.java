package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "position")
@Getter
@Setter
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;

    @ManyToOne
    @JoinColumn(name = "company_id") // 외래 키 설정
    private Company company;

    public Position(String position) {
        this.position = position;
    }

    public Position() {

    }
}
