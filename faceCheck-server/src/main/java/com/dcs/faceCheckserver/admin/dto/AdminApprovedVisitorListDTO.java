package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

import java.util.List;

@Data
public class AdminApprovedVisitorListDTO {
    private String name;
    private List<String> camera;
    private String number;
    private String visitPurpose;
}
