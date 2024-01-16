package com.dcs.faceCheckserver.company.data;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "position")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;
}
