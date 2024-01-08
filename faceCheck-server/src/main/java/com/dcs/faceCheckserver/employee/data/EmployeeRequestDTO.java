package com.dcs.faceCheckserver.employee.data;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeRequestDTO {
    private String name;
    private List<String> camera;
    private String department;
    private String position;
    private String number;
    private Long mainImageId;
    private List<Long> imagesId;
    private String adminId;
}
