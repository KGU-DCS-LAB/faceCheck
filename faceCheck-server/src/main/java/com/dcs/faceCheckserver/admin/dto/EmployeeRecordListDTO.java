package com.dcs.faceCheckserver.admin.dto;

import lombok.Data;

@Data
public class EmployeeRecordListDTO {
    private String name; //직원 이름
    private String number; //직원 번호
    private String department; //직원 부서 이름
    private String position; //직원 직급 이름
    private String camera; //출입 카메라 이름
    private String date; //출입한 날짜와 시간
}
