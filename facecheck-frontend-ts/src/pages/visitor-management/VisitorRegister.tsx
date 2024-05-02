import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem, OutlinedInput,
    Select, SelectChangeEvent,
    TextField, Theme,
    Typography,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {AxiosResponse} from "axios/index";

const VisitorRegister:React.FC = () => {
    const [name, setName] = useState<String>("");
    const [id, setId] = useState<String>("");
    const [cameras, setCameras] = useState<string[]>([]);
    const [selectedCameras, setSelectedCameras] = React.useState<string[]>([]);

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleChange = (event: SelectChangeEvent<typeof selectedCameras>) => {
        const {
            target: { value },
        } = event;
        setSelectedCameras(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (name.trim() === "" || id.trim() === "" || selectedCameras.length == 0) {
            Swal.fire({
                icon: "error",
                title: "입력 오류",
                text: "이름, 사번, 출입가능카메라를 모두 입력하세요.",
            });
            return;
        }

        const variables = {
            name: name,
            memberId: id,
            memberPassword: id,
            authority: "ROLE_VISITOR",
            cameraNames: selectedCameras,
        };

        Axios.post("/auth/signup", variables).then((response: AxiosResponse<String>)=> {
            if(response.data) {
                Swal.fire({
                    icon: "success",
                    title: "방문자 등록 성공",
                    text: "방문자가 성공적으로 등록되었습니다.",
                });
                console.log(response.data);
                setName("");    //텍스트 필드 초기화
                setId("");
                setSelectedCameras([]);
                //alert("성공적으로 등록되었습니다.");
            } else {
                //alert("직원 등록에 실패했습니다.");
                Swal.fire({
                    icon: "error",
                    title: "방문자 등록 실패",
                    text: "방문자 등록에 실패했습니다.",
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

    interface Camera {
        name: string;
        place: string[];
    }

    useEffect(() => {
        Axios.get("/admin/company", {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then(response => {
            if(response.data){
                let cameraList:string[] = response.data.camera.map((camera: Camera) => camera.name);
                setCameras(cameraList);
            }
            else{
                alert('카메라 정보 가져오기를 실패했습니다.')
            }
        })
    }, []);


    return (
        <div>
            {/*방문자 등록*/}
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    방문자 등록
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
                            <InputLabel>사번</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={id}
                                onChange={onIdChange}
                            />
                        </Box>
                    </Grid>
                    {/*출입가능카메라*/}
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{  width: "100%" }}>
                            <InputLabel id="demo-multiple-chip-label">출입가능카메라</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectedCameras}
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
                                {cameras.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: "20px",
                                width: "22%",
                                height: "40px",
                                float: "right",
                            }}
                            onClick={onClick}
                        >
                            등록
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default VisitorRegister;
