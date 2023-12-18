import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import "../../src/style.css";
import WelcomeToFacecheckImage from "../assets/welcomeToFacecheck.png";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdChange = (e) => {
        setId(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            adminId: Id,
            adminPassword: Password,
        }

        Axios.post('/admin/login', variables)
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                    alert("로그인에 성공했습니다.")
                    navigate("/");
                } else {
                    alert('로그인에 실패했습니다.')
                }
            })
    }

    return (
        <div className="container" style={{marginTop: "50px"}}>
            <div
                className="background-image"
                style={{display: "flex", justifyContent: "flex-start"}}
            >
                <div className="logo" style={{flex: "0 0 auto", marginTop: "20px"}}>
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
                                paddingTop: "15%"
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

                                <TextField
                                    sx={{ visibility: 'hidden' }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <Link
                                        component={RouterLink}
                                        to="/signup"
                                        sx={{color: "#9FB9DE"}}
                                    >
                                        아직 회원이 아니라면?
                                    </Link>
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
