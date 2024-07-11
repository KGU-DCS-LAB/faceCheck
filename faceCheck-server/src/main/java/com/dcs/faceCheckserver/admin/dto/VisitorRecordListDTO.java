package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

@Data
public class VisitorRecordListDTO {
    private String name; //방문자 이름
    private String camera; //출입 카메라 이름
    private String date; //출입한 날짜와 시간
}
