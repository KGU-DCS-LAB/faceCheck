package com.dcs.faceCheckserver.employee.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeMypageResponseDTO {
    private String name;
    private String number;
    private String department;
    private String position;
    private List<RecordResponseDTO> record;
}
