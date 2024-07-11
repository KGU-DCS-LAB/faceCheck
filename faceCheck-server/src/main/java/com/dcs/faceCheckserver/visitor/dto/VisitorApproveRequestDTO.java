package com.dcs.faceCheckserver.visitor.dto;

import lombok.Data;

import java.util.List;

@Data
public class VisitorApproveRequestDTO {
    private String name; //방문자 이름
    private String visitPurpose; //방문 목적
    private List<String> cameraList; //출입 가능 카메라
    private String mainImageId; //방문자 메인 이미지 아이디
    private List<String> openFaceImageId; //openface 학습용 이미지 아이디
}
