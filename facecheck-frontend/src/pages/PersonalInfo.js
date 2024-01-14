import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const PersonalInfo = ({ name, email, isCompanyEditing }) => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    setUserInfo({ name, email });
  }, [name, email]);

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  return (
    <>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        margin="normal"
        fullWidth
        disabled={!isCompanyEditing}
        value={userInfo.name}
        onChange={handleNameChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        margin="normal"
        fullWidth
        disabled={!isCompanyEditing}
        value={userInfo.email}
        onChange={handleEmailChange}
      />
    </>
  );
};

export default PersonalInfo;
