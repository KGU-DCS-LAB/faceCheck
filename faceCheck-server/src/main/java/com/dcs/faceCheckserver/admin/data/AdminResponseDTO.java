package com.dcs.faceCheckserver.admin.data;

import lombok.Data;

@Data
public class AdminResponseDTO {
    private Long id;
    private String name;
    private Long companyId;
    private String companyName;

    public AdminResponseDTO(Long id, String name, Long companyId, String companyName) {
        this.id = id;
        this.name = name;
        this.companyId = companyId;
        this.companyName = companyName;
    }
}
