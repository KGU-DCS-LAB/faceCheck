package com.dcs.faceCheckserver.company.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateCameraRequestDTO {
    private String camera;
    private List<String> department;
}
