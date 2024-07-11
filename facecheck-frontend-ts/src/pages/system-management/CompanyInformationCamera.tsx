import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const CompanyInformationCamera:React.FC = () => {

    const [cameraName, setCameraName] = useState<string>("")
    const [departmentList, setDepartmentList] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = React.useState<string[]>([]);

    useEffect(() => {
        Axios.get("/admin/company", {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then(response => {
            if(response.data){
                setDepartmentList(response.data.department);
            }
            else{
                alert('카메라 정보 가져오기를 실패했습니다.')
            }
        })
    }, []);

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCameraName(e.target.value);
    };

    const handleChange = (event: SelectChangeEvent<typeof selectedDepartment>) => {
        const {
            target: { value },
        } = event;
        setSelectedDepartment(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (cameraName.trim() === "" || selectedDepartment.length == 0) {
            Swal.fire({
                icon: "error",
                title: "입력 오류",
                text: "등록할 카메라 이름과 출입 가능한 부서를 모두 입력하세요.",
            });
            return;
        }

        const variables = {
            camera: cameraName,
            department: selectedDepartment,
        };

        Axios.post("/admin/camera/create", variables, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then((response: AxiosResponse<String>)=> {
            if(response.data) {
                Swal.fire({
                    icon: "success",
                    title: "카메라 등록 성공",
                    text: "카메라가 성공적으로 등록되었습니다.",
                });
                console.log(response.data);
                setCameraName("")   //텍스트 필드 초기화
                setSelectedDepartment([]);
                //alert("성공적으로 등록되었습니다.");
            } else {
                //alert("직원 등록에 실패했습니다.");
                Swal.fire({
                    icon: "error",
                    title: "카메라 등록 실패",
                    text: "카메라 등록에 실패했습니다.",
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
            {/*카메라 등록*/}
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    카메라 등록
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Box style={ textFieldMargin }>
                            <InputLabel>등록할 카메라 이름</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={cameraName}
                                onChange={onNameChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{  width: "100%", marginTop : "33px" }} >
                            <InputLabel id="demo-multiple-chip-label">출입 가능한 부서</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectedDepartment}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {departmentList.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
    )
}

export default CompanyInformationCamera;