package com.dcs.faceCheckserver.visitor;

import com.dcs.faceCheckserver.visitor.dto.VisitorApproveRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visitor")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    //방문자 마이페이지 정보 조회
    @RequestMapping(value = "/{visitorId}", method = RequestMethod.GET)
    public ResponseEntity<?> getMypage(@PathVariable String visitorId) {
        return visitorService.getMypage(visitorId);
    }

    //출입 가능 카메라 정보 조회
    @RequestMapping(value = "/camera/{visitorId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCameraList(@PathVariable String visitorId) {
        return visitorService.getCameraList(visitorId);
    }

    //방문자 승인 요청
    @RequestMapping(value = "/approve/{visitorId}", method = RequestMethod.POST)
    public ResponseEntity<String> approveVisitor(@PathVariable String visitorId, @RequestBody VisitorApproveRequestDTO visitorApproveRequestDTO) {
        String name = visitorApproveRequestDTO.getName();
        String visitPurpose = visitorApproveRequestDTO.getVisitPurpose();
        List<String> cameraList = visitorApproveRequestDTO.getCameraList();
        String mainImageId = visitorApproveRequestDTO.getMainImageId();
        List<String> openFaceImageId = visitorApproveRequestDTO.getOpenFaceImageId();

        return visitorService.approveVisitor(visitorId, name, visitPurpose, cameraList, mainImageId, openFaceImageId);
    }
}
