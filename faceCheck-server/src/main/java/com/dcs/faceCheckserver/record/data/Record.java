package com.dcs.faceCheckserver.record.data;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "record")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Visitor visitor;

    @ManyToOne
    private Camera camera;

    private LocalDateTime dateTime; // 출입 날짜 및 시간

    public Record(Employee employee, Visitor visitor, Camera camera, LocalDateTime dateTime) {
        this.employee = employee;
        this.visitor = visitor;
        this.camera = camera;
        this.dateTime = dateTime;
    }
}
