package com.dcs.faceCheckserver.record;

import com.dcs.faceCheckserver.company.data.Camera;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import com.dcs.faceCheckserver.employee.EmployeeRepository;
import com.dcs.faceCheckserver.employee.data.Employee;
import com.dcs.faceCheckserver.record.data.Record;
import com.dcs.faceCheckserver.visitor.VisitorRepository;
import com.dcs.faceCheckserver.visitor.data.Visitor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class RecordService {

    private final RecordRepository recordRepository;
    private final EmployeeRepository employeeRepository;
    private final VisitorRepository visitorRepository;
    private final CameraRepository cameraRepository;

    public RecordService(RecordRepository recordRepository, EmployeeRepository employeeRepository, VisitorRepository visitorRepository, CameraRepository cameraRepository) {
        this.recordRepository = recordRepository;
        this.employeeRepository = employeeRepository;
        this.visitorRepository = visitorRepository;
        this.cameraRepository = cameraRepository;
    }

    public ResponseEntity<String> createRecord(String id, String cameraName, String dateTime, boolean isEmployee) {
        if (isEmployee) {
            return createEmployeeRecord(id, cameraName, dateTime);
        } else {
            return createVisitorRecord(id, cameraName, dateTime);
        }
    }

    private ResponseEntity<String> createEmployeeRecord(String employeeId, String cameraName, String dateTime) {
        Optional<Employee> employeeOptional = employeeRepository.findByEmployeeId(employeeId);
        if (employeeOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("직원을 찾을 수 없습니다.");
        }

        Employee employee = employeeOptional.get();

        Optional<Camera> cameraOptional = cameraRepository.findByName(cameraName);
        if (cameraOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "얼굴 인식 카메라를 찾을 수 없습니다: " + cameraName);
        }
        Camera camera = cameraOptional.get();
        LocalDateTime localDateTime = parseDateTime(dateTime);

        recordRepository.save(new Record(employee, null, camera, localDateTime));
        return ResponseEntity.ok("직원 출입 기록이 등록되었습니다.");
    }

    private ResponseEntity<String> createVisitorRecord(String visitorId, String cameraName, String dateTime) {
        Optional<Visitor> visitorOptional = visitorRepository.findByVisitorId(visitorId);
        if (visitorOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("방문자를 찾을 수 없습니다.");
        }

        Visitor visitor = visitorOptional.get();

        Optional<Camera> cameraOptional = cameraRepository.findByName(cameraName);
        if (cameraOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "얼굴 인식 카메라를 찾을 수 없습니다: " + cameraName);
        }
        Camera camera = cameraOptional.get();
        LocalDateTime localDateTime = parseDateTime(dateTime);

        recordRepository.save(new Record(null, visitor, camera, localDateTime));
        return ResponseEntity.ok("방문자 출입 기록이 등록되었습니다.");
    }

    private LocalDateTime parseDateTime(String dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        return LocalDateTime.parse(dateTime, formatter);
    }
}
