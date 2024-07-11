package com.dcs.faceCheckserver.visitor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
