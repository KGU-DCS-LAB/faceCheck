package com.dcs.faceCheckserver.company;

import com.dcs.faceCheckserver.company.dto.AllCompaniesDTO;
import com.dcs.faceCheckserver.company.dto.CreateCameraRequestDTO;
import com.dcs.faceCheckserver.company.dto.UpdateRequestDTO;
import com.dcs.faceCheckserver.company.repository.CameraDepartmentRepository;
import com.dcs.faceCheckserver.company.repository.CameraRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class CompanyController {

    private final CompanyService companyService;
    private final CameraDepartmentRepository cameraDepartmentRepository;
    private final CameraRepository cameraRepository;

    public CompanyController(CompanyService companyService, CameraDepartmentRepository cameraDepartmentRepository, CameraRepository cameraRepository) {
        this.companyService = companyService;
        this.cameraDepartmentRepository = cameraDepartmentRepository;
        this.cameraRepository = cameraRepository;
    }

    //회사 정보 전체 조회
    @RequestMapping(value = "/company", method = RequestMethod.GET)
    public AllCompaniesDTO getAllCompanies() {
        return companyService.getAllCompanies();
    }

    //부서 등록
    @RequestMapping(value = "/department/create", method = RequestMethod.POST)
    public ResponseEntity<String> createDepartment(@RequestBody Map<String, List<String>> requestBody) {
        List<String> departmentsName = requestBody.get("department");
        companyService.createDepartment(departmentsName);
        return ResponseEntity.ok("부서가 성공적으로 등록되었습니다.");
    }

    //카메라 등록
    @RequestMapping(value = "/camera/create", method = RequestMethod.POST)
    public ResponseEntity<String> createCamera(@RequestBody CreateCameraRequestDTO createCameraRequestDTO) {
        String cameraName = createCameraRequestDTO.getCamera();
        List<String> departmentsName = createCameraRequestDTO.getDepartment();

        companyService.createCamera(cameraName, departmentsName);

        return ResponseEntity.ok("얼굴 인식 카메라가 성공적으로 등록되었습니다.");
    }

    //직급 등록
    @RequestMapping(value = "/position/create", method = RequestMethod.POST)
    public ResponseEntity<String> createPosition(@RequestBody Map<String, List<String>> requestBody) {
        List<String> positionsName = requestBody.get("position");
        companyService.createPosition(positionsName);
        return ResponseEntity.ok("직급이 성공적으로 등록되었습니다.");
    }

    //부서 수정
    @RequestMapping(value = "/department/update", method = RequestMethod.PATCH)
    public ResponseEntity<String> updateDepartment(@RequestBody UpdateRequestDTO updateDepartmentRequestDTO) {
        String originalDepartmentName = updateDepartmentRequestDTO.getName();
        String updatedDepartmentName = updateDepartmentRequestDTO.getChangeName();
        companyService.updateDepartment(originalDepartmentName, updatedDepartmentName);
        return ResponseEntity.ok("부서가 성공적으로 수정되었습니다.");
    }

    //직급 수정
    @RequestMapping(value = "/position/update", method = RequestMethod.PATCH)
    public ResponseEntity<String> updatePosition(@RequestBody UpdateRequestDTO updatePositionRequestDTO) {
        String originalPositionName = updatePositionRequestDTO.getName();
        String updatePositionName = updatePositionRequestDTO.getChangeName();
        companyService.updatePosition(originalPositionName, updatePositionName);
        return ResponseEntity.ok("직급이 성공적으로 수정되었습니다.");
    }

    //카메라 수정
    @RequestMapping(value = "/camera/update", method = RequestMethod.PATCH)
    public ResponseEntity<String> updateCamera(@RequestBody UpdateRequestDTO updateCameraDTO) {
        String originalCameraName = updateCameraDTO.getName();
        String updateCameraName = updateCameraDTO.getChangeName() != null ? updateCameraDTO.getChangeName() : updateCameraDTO.getName();
        List<String> changeDepartmentNames = updateCameraDTO.getChangeDepartment();
        companyService.updateCamera(originalCameraName, updateCameraName, changeDepartmentNames);
        return ResponseEntity.ok("얼굴 인식 카메라가 성공적으로 수정되었습니다.");
    }

    @RequestMapping(value = "/dd", method = RequestMethod.PATCH)
    public void dd() {
        cameraRepository.deleteAll();
    }
}
