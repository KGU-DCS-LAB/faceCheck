package com.dcs.faceCheckserver.employee.dto;

import lombok.Data;

import java.util.List;

@Data
public class ApproveEmployeeRequestDTO {
    private String name;
    private String department;
    private String position;
    private String mainImageId;
    private List<String> openFaceImageId;
}
