package com.dcs.faceCheckserver.admin.data;

import lombok.Data;

import java.util.List;

@Data
public class AdminRequestDTO {
    private String name;
    private String adminId;
    private String adminPassword;
    private String email;
    private String companyName;
    private List<String> companyPosition;
    private List<String> companyDepartment;
}
