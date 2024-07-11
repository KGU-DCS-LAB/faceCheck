package com.dcs.faceCheckserver.visitor.dto;

import com.dcs.faceCheckserver.record.dto.ResponseRecordDTO;
import lombok.Data;

import java.util.List;

@Data
public class VisitorMypageResponseDTO {
    private String name;
    private String number;
    private String visitPurpose;
    private List<String> camera; //출입 가능 카메라
    private String mainImageURL;
    private List<String> imagesURL;
    private List<ResponseRecordDTO> record;
}
