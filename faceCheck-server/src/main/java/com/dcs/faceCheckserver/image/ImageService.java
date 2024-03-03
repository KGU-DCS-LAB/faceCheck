package com.dcs.faceCheckserver.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

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
            String savedPath = "/Users/yeonsu/IdeaProjects/faceCheck/img" + savedName;

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
}
