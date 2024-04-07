import React, {useState} from "react";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import Axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import FileUpload from "../fileUpload/FileUpload";
import Dropzone from "react-dropzone";

const EmployeeApprove:React.FC = () => {

    const [name, setName] = useState<String>("");
    const [department, setDepartment] = useState<String>("");
    const [position, setPosition] = useState<String>("");
    const Id = Cookies.get("ID");

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onDepartmentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    };

    const onPositionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPosition(e.target.value);
    };

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (name.trim() === "" || department.trim() === "" || position.trim() === "" ) {
            Swal.fire({
                icon: "error",
                title: "입력 오류",
                text: "모두 입력하세요.",
            });
            return;
        }

            const variables = {
                name: name,
                department: department,
                position: position,
                // mainImageURL: "",
                // imagesURL: ["","",""],
            };

            Axios.post(`/employee/approve/${Id}`, variables, {
                headers: {
                        "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                }).then((response: AxiosResponse<String>) => {
                    if(response.status === 200) {
                        console.log(response.data);
                        Swal.fire({
                            icon: "success",
                            title: "직원 승인 요청 성공",
                            text: "성공적으로 승인 요청되었습니다.",
                        });
                    }
            }).catch((error: any) => {
                if(error.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "직원 승인 요청 실패",
                        text: error.response.data,
                    });
                }
            })
    }

    const titleStyle = {
        fontWeight: "bold",
        fontFamily: "Noto Serif KR, serif",
        marginBottom: "40px"
    };

    const marginStyle = {
        margin: "50px",
    };

    const textFieldMargin = {
        margin: "10px 0",
    };

    return (
        <div>
            {/*직원 등록*/}
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    직원 승인 요청
                </Typography>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item xs={12} md={6}>
                        <InputLabel>기본 이미지</InputLabel><br/>
                        <FileUpload/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel>AI 학습을 위한 이미지(10장)</InputLabel><br/>
                        <FileUpload/>
                    </Grid>
                </Grid>
                <br/>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <InputLabel>이름</InputLabel>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={onNameChange}
                    />
                    <InputLabel>부서</InputLabel>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={department}
                        onChange={onDepartmentChange}
                    />
                    <InputLabel>직급</InputLabel>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={position}
                        onChange={onPositionChange}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    // fullWidth
                    style={{
                        marginTop: "20px",
                        width: "10%",
                        // marginRight: "auto",
                    }}
                    onClick={onClick}
                >
                    요청
                </Button>
            </div>
        </div>
    )
}

export default EmployeeApprove;