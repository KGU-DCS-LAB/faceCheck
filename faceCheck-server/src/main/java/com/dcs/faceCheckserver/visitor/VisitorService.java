package com.dcs.faceCheckserver.visitor;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.record.data.Record;
import com.dcs.faceCheckserver.record.dto.ResponseRecordDTO;
import com.dcs.faceCheckserver.visitor.data.CameraVisitor;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import com.dcs.faceCheckserver.visitor.dto.VisitorMypageResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }


    public ResponseEntity<?> getMypage(String visitorId) {
        Optional<Visitor> visitorOptional = visitorRepository.findByVisitorId(visitorId);
        if (visitorOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("방문자가 존재하지 않습니다.");
        }

        Visitor visitor = visitorOptional.get();

        VisitorMypageResponseDTO visitorMypageResponseDTO = new VisitorMypageResponseDTO();

        visitorMypageResponseDTO.setName(visitor.getName());
        visitorMypageResponseDTO.setNumber(visitor.getNumber());
        visitorMypageResponseDTO.setVisitPurpose(visitor.getVisitPurpose());

        List<String> cameraList = new ArrayList<>();
        for (CameraVisitor cameraVisitor: visitor.getCameraVisitors()) {
            Camera camera = cameraVisitor.getCamera();
            cameraList.add(camera.getName());
        }
        visitorMypageResponseDTO.setCamera(cameraList);

        //mainImageURL, imagesURL

        List<ResponseRecordDTO> responseRecordDTOList = new ArrayList<>();
        for (Record record: visitor.getRecordList()) {
            String entryCameraName = record.getCamera().getName();

            LocalDateTime dateTime = record.getDateTime();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
            String entryDateTime = dateTime.format(formatter);

            ResponseRecordDTO responseRecordDTO = new ResponseRecordDTO();
            responseRecordDTO.setCamera(entryCameraName);
            responseRecordDTO.setDate(entryDateTime);
            responseRecordDTOList.add(responseRecordDTO);
        }

        visitorMypageResponseDTO.setRecord(responseRecordDTOList);

        return ResponseEntity.ok(visitorMypageResponseDTO);
    }

    public ResponseEntity<?> getCameraList(String visitorId) {
        Optional<Visitor> visitorOptional = visitorRepository.findByVisitorId(visitorId);
        if (visitorOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("방문자가 존재하지 않습니다.");
        }
        Visitor visitor = visitorOptional.get();

        List<String> response = new ArrayList<>();

        for (CameraVisitor cameraVisitor : visitor.getCameraVisitors()) {
            response.add(cameraVisitor.getCamera().getName());
        }
        return ResponseEntity.ok(response);
    }
}
