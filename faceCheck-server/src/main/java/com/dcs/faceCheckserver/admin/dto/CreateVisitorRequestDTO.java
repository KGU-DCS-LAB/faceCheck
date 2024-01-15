package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateVisitorRequestDTO {
    private String name;
    private String number;
    private List<String> camera;
}
