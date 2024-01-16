import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import axios from "axios";

function VisitorRegister() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedCameras, setSelectedCameras] = useState([]);

  const cameraOptions = [
    "카메라 1",
    "카메라 2",
    "카메라 3",
    "카메라 4",
    "카메라 5",
    "카메라 6",
  ];

  const titleStyle = {
    fontWeight: "bold",
  };

  const textFieldMargin = {
    margin: "10px 0",
  };

  const fieldContainer = {
    marginBottom: "20px",
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleCamerasChange = (event) => {
    setSelectedCameras(event.target.value);
  };

  const handleRegister = () => {
    if (
      name.trim() === "" ||
      number.trim() === "" ||
      selectedCameras.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "입력 오류",
        text: "이름, 번호, 방문 가능한 카메라를 모두 선택하세요.",
      });
      return;
    }

    const requestData = {
      name: name,
      number: number,
      camera: selectedCameras,
    };

    axios
      .post("/admin/visitor/create", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "방문자 등록 성공",
            text: "방문자가 성공적으로 등록되었습니다.",
          });
          setName("");
          setNumber("");
          setSelectedCameras([]);
        }
      })
      .catch((error) => {
        console.error("방문자 등록 실패:", error);
        Swal.fire({
          icon: "error",
          title: "방문자 등록 실패",
          text: "방문자 등록에 실패했습니다.",
        });
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h5" style={titleStyle}>
        방문자 등록
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box style={fieldContainer}>
            <InputLabel>이름</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              style={textFieldMargin}
              value={name}
              onChange={handleNameChange}
            />
          </Box>
          <Box style={fieldContainer}>
            <InputLabel>방문 번호</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              style={textFieldMargin}
              value={number}
              onChange={handleNumberChange}
            />
          </Box>
          <Box style={fieldContainer}>
            <InputLabel>방문 가능한 카메라</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              style={textFieldMargin}
              value={selectedCameras}
              onChange={handleCamerasChange}
              multiple
            >
              {cameraOptions.map((camera, index) => (
                <MenuItem key={index} value={camera}>
                  {camera}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{
            marginTop: "20px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleRegister}
        >
          등록
        </Button>
      </Grid>
    </div>
  );
}

export default VisitorRegister;
