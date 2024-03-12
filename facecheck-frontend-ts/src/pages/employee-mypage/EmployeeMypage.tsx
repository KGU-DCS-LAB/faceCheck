import React, {useState} from "react";
import SmallMainImage from "../../assets/smallMain.png";
import {Box, Typography} from "@mui/material";

const EmployeeMypage:React.FC = () => {

    return (
        <div style={{ marginLeft: "250px", borderLeft: "1px solid rgba(0, 0, 0, 0.12)"}}>
            <Box>
                <div
                    style={{
                        width: "100%",
                        height: "150px",
                        overflow: "hidden",
                        margin: "0 auto",
                        position: "relative", // 포지션을 상대적으로 설정
                    }}
                >
                    <img
                        src={SmallMainImage}
                        alt="Main"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    {/* 이미지 위에 텍스트를 포지션을 이용하여 배치 */}
                    <Typography
                        variant="h4"
                        component="div"
                        style={{
                            position: "absolute",
                            top: "50%", // 수직 가운데 정렬
                            left: "10%", // 수평 가운데 정렬
                            transform: "translate(-50%, -50%)", // 가운데 정렬
                            color: "black", // 텍스트 색상
                            textAlign: "center", // 텍스트 가운데 정렬
                            fontFamily: "Noto Serif KR, serif"
                        }}
                    >
                        마이페이지
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default EmployeeMypage;
