package com.dcs.faceCheckserver.company.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateRequestDTO {
    private String name;
    private String changeName;
    private List<String> changeDepartment;
}
