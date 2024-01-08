package com.dcs.faceCheckserver.admin.data;

import lombok.Data;

@Data
public class AdminLoginResponseDTO {
    private Long id;
    private String adminId;
    private String adminName;

    public AdminLoginResponseDTO(Long id, String adminId, String adminName) {
        this.id = id;
        this.adminId = adminId;
        this.adminName = adminName;
    }
}
