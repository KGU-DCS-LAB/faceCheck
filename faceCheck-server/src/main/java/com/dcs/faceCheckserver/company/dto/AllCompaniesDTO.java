package com.dcs.faceCheckserver.company.dto;

import lombok.Data;

import java.util.List;

@Data
public class AllCompaniesDTO {
    private List<String> department;
    private List<String> position;
    private List<CameraDTO> camera;

    public AllCompaniesDTO(List<String> department, List<String> position, List<CameraDTO> camera) {
        this.department = department;
        this.position = position;
        this.camera = camera;
    }
}
