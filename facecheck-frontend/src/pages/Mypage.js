import { Card, CardContent, Typography, Button } from "@mui/material";
import WelcomeToFacecheckImage from "../assets/welcomeToFacecheck.png";
import "../style.css";
import PersonalInfo from "./PersonalInfo";
import CompanyInfo from "./CompanyInfo";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyDetail: "",
    companyDepartment: "",
    // 나머지 회사 정보를 초기화합니다.
  });

  useEffect(() => {
    getMyPageInfo();
  }, []);

  function getMyPageInfo() {
    // 쿠키에서 adminId 추출
    const adminId = getCookie("adminId"); // 'adminId'는 쿠키에 저장된 관리자 ID의 키 이름입니다.

    if (!adminId) {
      alert("관리자 ID를 찾을 수 없습니다.");
      return;
    }

    Axios.get(`/mypage/${adminId}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          alert("마이페이지 정보 조회에 성공했습니다.");
          // 여기에서 원하는 작업을 수행하세요.
          setUserInfo(response.data.userInfo);
          setCompanyInfo(response.data.companyInfo); // 회사 정보를 설정합니다.
        } else {
          alert("마이페이지 정보 조회에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("오류가 발생했습니다:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  }

  // 쿠키에서 특정 이름의 값을 가져오는 함수
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const [isCompanyEditing, setIsCompanyEditing] = useState(false);

  const handleCompanyEditClick = () => {
    setIsCompanyEditing(true);
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div
        className="background-image"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <div className="logo" style={{ flex: "0 0 auto", marginTop: "20px" }}>
          <img
            src={WelcomeToFacecheckImage}
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="your-component"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "60%",
              minHeight: 450,
              position: "relative",
              zIndex: 2,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "8%",
                paddingBottom: "20%",
                paddingTop: "15%",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: "Kalnia",
                  fontWeight: "bold",
                }}
              >
                MyPage
              </Typography>
              <PersonalInfo
                name={userInfo.name || ""}
                email={userInfo.email || ""}
                isCompanyEditing={isCompanyEditing}
              />

              <CompanyInfo
                companyInfo={companyInfo}
                isCompanyEditing={isCompanyEditing}
                setIsCompanyEditing={setIsCompanyEditing}
                handleCompanyEditClick={handleCompanyEditClick}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
