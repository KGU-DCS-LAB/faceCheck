package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

import java.util.List;

@Data
public class AdminJoinRequestDTO {
    private String name;
    private String adminId;
    private String adminPassword;
    private String email;
    private String companyName;
    private List<String> companyPosition;
    private List<String> companyDepartment;
}
