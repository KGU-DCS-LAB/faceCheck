import {
    Card,
    CardContent,
    Button,
    Link,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel, Alert,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import WelcomeToFacecheckImage from "../assets/welcomeToFacecheck.png";
import "../style.css";
import React, {useState} from "react";
import Axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

// export default function Login() {
const Login: React.FC = () => {

    const navigate = useNavigate();

    const [Id, setId] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Role, setRole] = useState<string>("");

    const onIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const onPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onRoleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const onSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        interface VariablesType {
            memberId: string;
            memberPassword: string;
            authority: string;
        }

        const variables : VariablesType = {
            memberId: Id,
            memberPassword: Password,
            authority: Role,
        };

        interface LoginResponseType {
            // 응답 데이터의 구조를 정의합니다.
            grantType : string,
            accessToken : string,
            tokenExpiresIn : BigInt,
        }

        Axios.post("/auth/login", variables).then((response: AxiosResponse<LoginResponseType>)=> {
            if(response.data) {
                console.log(response.data);
                Cookies.set("accessToken", response.data.accessToken);  //쿠키에 accessToken 저장
                Cookies.set("Role", variables.authority);                  //쿠키에 Role 저장
                Cookies.set("ID", Id);                                  //쿠키에 Id 저장
                alert("로그인에 성공했습니다.");
                navigate("/");
            } else {
                alert("로그인에 실패했습니다.");
            }
        })
    }

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
                                Login
                            </Typography>
                            <form>
                                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{marginTop: "8px"}}>
                                    초기 아이디, 비밀번호는 사번(방문번호)입니다.
                                </Alert>
                                <TextField
                                    id="standard-basic"
                                    label="ID"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onIdChange}
                                    value={Id}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="PASSWORD"
                                    type="password"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onPasswordChange}
                                    value={Password}
                                />

                                <TextField sx={{ visibility: "hidden" }} style={{ height: "4px" }}/>

                                <div>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={onRoleChange}     // 라디오 버튼이 변경될 때 호출되는 콜백 함수
                                        value={Role}    //현재 선택된 값으로 설정
                                    >
                                        <FormControlLabel value="ROLE_ADMIN" control={<Radio />} label="관리자" />
                                        <FormControlLabel value="ROLE_EMPLOYEE" control={<Radio />} label="직원" />
                                        <FormControlLabel value="ROLE_VISITOR" control={<Radio />} label="방문자" />
                                    </RadioGroup>
                                </div>

                                {/*<TextField sx={{ visibility: "hidden" }} />*/}

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginTop: "6px"
                                    }}
                                >
                                    {/*<Link*/}
                                    {/*    // component={RouterLink}*/}
                                    {/*    // to="/signup"*/}
                                    {/*    sx={{ color: "#9FB9DE" }}*/}
                                    {/*>*/}
                                    {/*    아직 회원이 아니라면?*/}
                                    {/*</Link>*/}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            fontFamily: "Kalnia",
                                            backgroundColor: "#9FB9DE",
                                            "&:hover": {
                                                backgroundColor: "#7487A7",
                                            },
                                        }}
                                        onClick={onSubmit}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;