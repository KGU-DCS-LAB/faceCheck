import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import "../../src/style.css";
import WelcomeToFacecheckImage from "../assets/welcomeToFacecheck.png";
import Axios from 'axios';

export default function SignUp() {

    const [AdminName, setAdminName] = useState("");
    const [AdminId, setAdminId] = useState("");
    const [AdminPassword, setAdminPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [CompanyPosition, setCompanyPosition] = useState([]);
    const [CompanyDepartment, setCompanyDepartment] = useState([]);


    const onAdminNameChange = (e) => {
        setAdminName(e.target.value)
    }

    const onAdminIdChange = (e) => {
        setAdminId(e.target.value)
    }

    const onAdminPasswordChange = (e) => {
        setAdminPassword(e.target.value)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onCompanyNameChange = (e) => {
        setCompanyName(e.target.value)
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
                            minHeight: 350,
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
                                height: "100%",
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
                                Sign Up
                            </Typography>
                            <form>
                                <TextField
                                    id="standard-basic"
                                    label="Name"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onAdminNameChange}
                                    value={AdminName}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="ID"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onAdminIdChange}
                                    value={AdminId}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="Password"
                                    type="password"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onAdminPasswordChange}
                                    value={AdminPassword}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onEmailChange}
                                    value={Email}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="CompanyName"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                    onChange={onCompanyNameChange}
                                    value={CompanyName}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="CompanyPosition"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                />

                                <TextField
                                    id="standard-basic"
                                    label="CompanyDepartment"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    sx={{ width: "100%" }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
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
                                    >
                                        Sign Up
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

