import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import Axios, {AxiosResponse} from "axios";

const EmployeeRegister:React.FC = () => {

    const [Name, setName] = useState<String>("");
    const [Id, setId] = useState<String>("");

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };


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

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const variables = {
            name: Name,
            memberId: Id,
            memberPassword: Id,
            authority: "ROLE_EMPLOYEE",
            cameraNames: null,
        };

        Axios.post("/auth/signup", variables).then((response: AxiosResponse<String>)=> {
            if(response.data) {
                console.log(response.data);
                setName("");
                setId("");
                alert("성공적으로 등록되었습니다.");
            } else {
                alert("직원 등록에 실패했습니다.");
            }
        })
    }

    return (
        <div>
            {/*직원 등록*/}
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    직원 등록
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Box style={textFieldMargin}>
                            <InputLabel>이름</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={Name}
                                onChange={onNameChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box style={textFieldMargin}>
                            <InputLabel>사번</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={Id}
                                onChange={onIdChange}
                            />
                        </Box>
                    </Grid>
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
                        등록
                    </Button>
                </Grid>
            </div>
        </div>
    );
};

export default EmployeeRegister;