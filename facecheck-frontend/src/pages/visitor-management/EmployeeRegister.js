import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function EmployeeRegister() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const titleStyle = {
    fontWeight: "bold",
  };

  const marginStyle = {
    margin: "20px",
  };

  const textFieldMargin = {
    margin: "10px 0",
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleRegister = () => {
    if (name.trim() === "" || number.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "입력 오류",
        text: "이름과 번호를 모두 입력하세요.",
      });
      return;
    }

    const requestData = {
      name: name,
      number: number,
    };

    axios
      .post("/admin/employee/create", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "직원 등록 성공",
            text: "직원이 성공적으로 등록되었습니다.",
          });
          setName(""); // 입력 필드 초기화
          setNumber("");
        }
      })
      .catch((error) => {
        console.error("직원 등록 실패:", error);
        Swal.fire({
          icon: "error",
          title: "직원 등록 실패",
          text: "직원 등록에 실패했습니다.",
        });
      });
  };

  return (
    <div style={marginStyle}>
      <Typography variant="h5" style={titleStyle}>
        직원 등록
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box style={textFieldMargin}>
            <InputLabel>이름</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Box>
          <Box style={textFieldMargin}>
            <InputLabel>사번</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              value={number}
              onChange={handleNumberChange}
            />
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

export default EmployeeRegister;
