package com.dcs.faceCheckserver.record.dto;

import lombok.Data;

@Data
public class ResponseRecordDTO {
    private String camera; //출입 카메라
    private String date; //출입한 날짜와 시간
}
