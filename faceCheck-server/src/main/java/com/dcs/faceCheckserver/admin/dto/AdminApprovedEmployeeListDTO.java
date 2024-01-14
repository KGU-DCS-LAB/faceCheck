package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

import java.util.List;

@Data
public class AdminApprovedEmployeeListDTO {
    private String name;
    private List<String> camera;
    private String department;
    private String position;
    private String number;
}
