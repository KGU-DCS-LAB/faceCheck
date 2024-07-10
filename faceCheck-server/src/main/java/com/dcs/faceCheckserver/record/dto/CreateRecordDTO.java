package com.dcs.faceCheckserver.record.dto;

import lombok.Data;

@Data
public class CreateRecordDTO {
    private String employeeId;
    private String visitorId;
    private String camera;
    private String dateTime;
}
