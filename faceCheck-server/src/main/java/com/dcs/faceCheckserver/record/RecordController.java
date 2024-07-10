package com.dcs.faceCheckserver.record;

import com.dcs.faceCheckserver.record.dto.CreateRecordDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class RecordController {

    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @RequestMapping(value = "/create/record", method = RequestMethod.POST)
    public ResponseEntity<String> createRecord(@RequestBody CreateRecordDTO createRecordDTO) {
        String employeeId = createRecordDTO.getEmployeeId();
        String visitorId = createRecordDTO.getVisitorId();
        String camera = createRecordDTO.getCamera();
        String dateTime = createRecordDTO.getDateTime();

        if (employeeId != null && visitorId == null) {
            return recordService.createRecord(employeeId, camera, dateTime, true);
        } else if (employeeId == null && visitorId != null) {
            return recordService.createRecord(visitorId, camera, dateTime, false);
        } else {
            return ResponseEntity.badRequest().body("출입자 정보가 없습니다.");
        }
    }
}
