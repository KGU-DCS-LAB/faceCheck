import React, {useState} from "react";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import Axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";

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
                mainImageURL: "",
                imagesURL: ["","",""],
            };

        //비밀번호 받아오는거 다시해야됨
            Axios.post(`/employee/approve/${Id}`, variables, {
                        headers: {
                            "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                            "Content-Type": "application/json",
                        },
                    }).then((response: AxiosResponse<String>)=> {
                if(response.data) {
                    console.log(response.data);
                    Swal.fire({
                        icon: "success",
                        title: "직원 등록 성공",
                        text: "직원이 성공적으로 등록되었습니다.",
                    });
                    console.log(response.data);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "직원 등록 실패",
                        text: "직원 등록에 실패했습니다.",
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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Box style={textFieldMargin}>
                            <InputLabel>이름</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={onNameChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box style={textFieldMargin}>
                            <InputLabel>부서</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={department}
                                onChange={onDepartmentChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box style={textFieldMargin}>
                            <InputLabel>직급</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={position}
                                onChange={onPositionChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                            marginTop: "20px",
                            width: "10%",
                            marginLeft: "auto",
                        }}
                        onClick={onClick}
                    >
                        요청
                    </Button>
                </Grid>
            </div>
        </div>
    )
}

export default EmployeeApprove;