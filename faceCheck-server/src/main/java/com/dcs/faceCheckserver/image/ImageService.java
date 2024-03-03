package com.dcs.faceCheckserver.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Long> uploadMultipleFiles(List<MultipartFile> files) throws Exception {
        if (files.isEmpty()) return null;

        List<Long> imageIdList = new ArrayList<>();
        for (MultipartFile file : files) {
            // 원래 파일 이름 추출
            String origName = file.getOriginalFilename();

            // 파일 이름으로 쓸 uuid 생성
            String uuid = UUID.randomUUID().toString();

            // 확장자 추출(ex : .png)
            String extension = origName.substring(origName.lastIndexOf("."));

            // uuid와 확장자 결합
            String savedName = uuid + extension;

            // 파일을 불러올 때 사용할 파일 경로
            // 경로 설정해야 함
            String savedPath = uploadDirectory + savedName;

            // 파일 엔티티 생성
            Image image = Image.builder()
                    .orgNm(origName)
                    .savedNm(savedName)
                    .savedPath(savedPath)
                    .build();

            // 실제로 로컬에 uuid를 파일명으로 저장
            file.transferTo(new File(savedPath));

            // 데이터베이스에 파일 정보 저장
            Image savedFile = imageRepository.save(image);

            imageIdList.add(savedFile.getImageId());
        }
        return imageIdList;
    }

    public ResponseEntity<byte[]> getImage(Long imageId) {
        try {
            byte[] imageData = getImageById(imageId);
            String encodedImageData = Base64.getEncoder().encodeToString(imageData);
            System.out.println(encodedImageData);
            return ResponseEntity.ok().body(imageData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private byte[] getImageById(Long imageId) throws Exception {
        // 이미지 ID로 데이터베이스에서 이미지 데이터를 가져오는 로직
        Image image = imageRepository.findByImageId(imageId);
        // 이미지 데이터를 바이트 배열로 변환하여 반환
        return getImageDataAsByteArray(image);
    }

    private byte[] getImageDataAsByteArray(Image image) {
        try {
            // 이미지 파일을 읽어들이는 FileInputStream 생성
            FileInputStream fileInputStream = new FileInputStream(image.getSavedPath());

            // 이미지 파일의 크기를 구함
            long fileSize = image.getSavedPath().length();

            // 이미지 파일을 저장할 바이트 배열 생성
            byte[] imageData = new byte[(int) fileSize];

            // 이미지 파일을 바이트 배열에 읽어들임
            int read = fileInputStream.read(imageData);
            System.out.println(read);

            // FileInputStream 닫기
            fileInputStream.close();

            return imageData;
        } catch (IOException e) {
            // 파일 읽기 실패 시 예외 처리
            e.printStackTrace();
            return null;
        }
    }

}
