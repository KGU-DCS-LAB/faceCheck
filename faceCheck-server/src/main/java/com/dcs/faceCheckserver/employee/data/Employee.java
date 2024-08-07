package com.dcs.faceCheckserver.employee.data;

import com.dcs.faceCheckserver.auth.entity.Authority;
import com.dcs.faceCheckserver.company.data.Department;
import com.dcs.faceCheckserver.company.data.Position;
import com.dcs.faceCheckserver.image.Image;
import com.dcs.faceCheckserver.record.data.Record;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private String employeePassword;

    private String name; //직원 이름
    private String number; //직원 번호
    private String state; //요청전, 요청, 완료

    @ManyToOne
    private Department department; //부서

    @ManyToOne
    private Position position; //직급

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToOne
    private Image mainImage; //메인 이미지

    @OneToMany
    private List<Image> openFaceImage; //openface 학습용 이미지

    @OneToMany
    private List<Record> recordList; //출입 기록

    @Builder
    public Employee(String name, String employeeId, String employeePassword, String number, Authority authority, String state) {
        this.name = name;
        this.employeeId = employeeId;
        this.employeePassword = employeePassword;
        this.number = number;
        this.authority = authority;
        this.state = state;
    }

    public Employee(String name, String number, String state) {
        this.name = name;
        this.number = number;
        this.state = state;
    }
}
