package com.dcs.faceCheckserver.image;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
@CrossOrigin("*")
public class ImageController {
    private final ImageService imageService;

    // 이미지 업로드
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<List<Long>> uploadMultipleFiles(@RequestPart("files") List<MultipartFile> files) {
        try {
            List<Long> imageId = imageService.uploadMultipleFiles(files);
            return ResponseEntity.ok().body(imageId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 이미지 출력
    @RequestMapping(value = "/{imageId}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("imageId") Long imageId) {
        return imageService.getImage(imageId);
    }
}
