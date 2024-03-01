package com.dcs.faceCheckserver.employee.dto;

import lombok.Data;

@Data
public class ApproveEmployeeRequestDTO {
    private String name;
    private String number;
    private String department;
    private String position;
}
