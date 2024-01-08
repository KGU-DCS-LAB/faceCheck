import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const PersonalInfo = ({ name, email }) => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUserInfo({ name, email });
  }, [name, email]);

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // 여기서 변경된 userInfo를 저장하는 로직을 추가할 수 있습니다.
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        margin="normal"
        fullWidth
        disabled={!isEditing}
        value={userInfo.name}
        onChange={handleNameChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        margin="normal"
        fullWidth
        disabled={!isEditing}
        value={userInfo.email}
        onChange={handleEmailChange}
      />
      {/* 버튼 관련 코드 유지 */}
    </>
  );
};

export default PersonalInfo;
