package com.dcs.faceCheckserver.company.dto;

import lombok.Data;

import java.util.List;

@Data
public class CameraDTO {
    private String name;
    private List<String> place;

    public CameraDTO(String name, List<String> place) {
        this.name = name;
        this.place = place;
    }
}
